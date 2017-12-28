package ru.splashcourse.liubachka.logics.video;

import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.googleapis.auth.oauth2.GoogleClientSecrets;
import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.googleapis.json.GoogleJsonResponseException;
import com.google.api.client.googleapis.media.MediaHttpUploader;
import com.google.api.client.googleapis.media.MediaHttpUploaderProgressListener;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.InputStreamContent;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.services.youtube.YouTube;
import com.google.api.services.youtube.model.Video;
import com.google.api.services.youtube.model.VideoSnippet;
import com.google.api.services.youtube.model.VideoStatus;

import org.apache.http.HttpStatus;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.security.GeneralSecurityException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletResponse;

import ru.splashcourse.liubachka.LiubackApplication;
import ru.splashcourse.liubachka.configs.orika.OrikaBeanMapper;
import ru.splashcourse.liubachka.configs.role.RoleName;
import ru.splashcourse.liubachka.logics.admin.usermanagment.User;
import ru.splashcourse.liubachka.logics.admin.usermanagment.UserRepository;
import ru.splashcourse.liubachka.logics.video.model.Comment;
import ru.splashcourse.liubachka.logics.video.model.CommentDto;
import ru.splashcourse.liubachka.logics.video.model.CommentRepository;
import ru.splashcourse.liubachka.logics.video.model.VideoMeta;
import ru.splashcourse.liubachka.logics.video.model.VideoMetaDto;
import ru.splashcourse.liubachka.logics.video.model.VideoMetaRepository;
import ru.splashcourse.liubachka.utils.UtilsSecurity;

@Service
@Transactional(propagation = Propagation.REQUIRES_NEW)
public class VideoServiceImpl implements VideoService {

    /**
     * Define a global variable that specifies the MIME type of the video being uploaded.
     */
    private static final String VIDEO_FILE_FORMAT = "video/*";

    @Value("${liu.google.refreshToken}")
    private String googleRefreshToken;

    @Autowired
    private VideoMetaRepository repo;

    @Autowired
    private CommentRepository commentRepo;

    @Autowired
    private OrikaBeanMapper mapper;

    @Autowired
    private UserRepository userRepo;

    private static final String SECRETS_FILE_NAME = "client_secret.json";

    private Credential generateCredentialWithUserApprovedToken() throws GeneralSecurityException, IOException {
        JsonFactory jsonFactory = JacksonFactory.getDefaultInstance();
        HttpTransport httpTransport = GoogleNetHttpTransport.newTrustedTransport();
        GoogleClientSecrets clientSecrets = null;
        try (InputStream is = getClass().getClassLoader().getResourceAsStream(SECRETS_FILE_NAME)) {
            InputStreamReader inputStreamReader = new InputStreamReader(is);
            clientSecrets = GoogleClientSecrets.load(jsonFactory, inputStreamReader);
        } catch (IOException e) {
            throw e;
        }
        return new GoogleCredential.Builder().setTransport(httpTransport).setJsonFactory(jsonFactory).setClientSecrets(clientSecrets)
                .build().setRefreshToken(googleRefreshToken);
    }

    @Override
    public VideoMeta upload(VideoMetaDto meta, MultipartFile file, OutputStream progressOutStream, HttpServletResponse response) {
        try {
            VideoMeta video = mapper.map(meta, VideoMeta.class);
            User creator = userRepo.findById(UtilsSecurity.getUser().getId());

            video.setCreator(creator);

            Credential cred = generateCredentialWithUserApprovedToken();
            cred.refreshToken();
            YouTube youtube = new YouTube.Builder(LiubackApplication.HTTP_TRANSPORT, JacksonFactory.getDefaultInstance(), cred)
                    .setApplicationName("splashcourse").build();

            Logger.getLogger(this.getClass()).debug("Uploading: " + meta.getName());

            Video videoObjectDefiningMetadata = new Video();

            VideoStatus status = new VideoStatus();
            status.setPrivacyStatus(YoutubePrivacy.UNLISTED.getName());
            videoObjectDefiningMetadata.setStatus(status);

            VideoSnippet snippet = new VideoSnippet();

            Calendar cal = Calendar.getInstance();
            snippet.setTitle(meta.getName() + " by " + video.getCreator().getFullName() + "@" + cal.getTime());
            snippet.setDescription(meta.getDescription());

            List<String> tags = new ArrayList<String>();
            tags.add("SplashCourse");
            snippet.setTags(tags);

            videoObjectDefiningMetadata.setSnippet(snippet);

            InputStreamContent mediaContent = new InputStreamContent(VIDEO_FILE_FORMAT, file.getInputStream());

            // Insert the video. The command sends three arguments. The first
            // specifies which information the API request is setting and which
            // information the API response should return. The second argument
            // is the video resource that contains metadata about the new video.
            // The third argument is the actual video content.
            YouTube.Videos.Insert videoInsert = youtube.videos().insert("snippet,statistics,status", videoObjectDefiningMetadata,
                    mediaContent);

            // Set the upload type and add an event listener.
            MediaHttpUploader uploader = videoInsert.getMediaHttpUploader();

            // Indicate whether direct media upload is enabled. A value of
            // "True" indicates that direct media upload is enabled and that
            // the entire media content will be uploaded in a single request.
            // A value of "False," which is the default, indicates that the
            // request will use the resumable media upload protocol, which
            // supports the ability to resume an upload operation after a
            // network interruption or other transmission failure, saving
            // time and bandwidth in the event of network failures.
            uploader.setDirectUploadEnabled(false);

            MediaHttpUploaderProgressListener progressListener = new MediaHttpUploaderProgressListener() {
                @Override
                public void progressChanged(MediaHttpUploader uploader) throws IOException {
                    switch (uploader.getUploadState()) {
                        case INITIATION_STARTED:
                            Logger.getLogger(this.getClass()).debug("Initiation Started");
                            break;
                        case INITIATION_COMPLETE:
                            Logger.getLogger(this.getClass()).debug("Initiation Completed");
                            break;
                        case MEDIA_IN_PROGRESS:
                            Logger.getLogger(this.getClass()).debug("Upload in progress");
                            Double progress = 1d * uploader.getNumBytesUploaded() / file.getSize() * 100d;
                            Logger.getLogger(this.getClass()).debug("Upload percentage: " + progress);
                            progressOutStream.write((progress + " ").getBytes());
                            progressOutStream.flush();
                            break;
                        case MEDIA_COMPLETE:
                            Logger.getLogger(this.getClass()).debug("Upload Completed!");
                            response.setStatus(HttpStatus.SC_OK);
                            break;
                        case NOT_STARTED:
                            Logger.getLogger(this.getClass()).debug("Upload Not Started!");
                            break;
                    }
                }
            };
            uploader.setProgressListener(progressListener);

            // Call the API and upload the video.
            Video returnedVideo = videoInsert.execute();

            Logger.getLogger(this.getClass()).debug("\n================== Returned Video ==================\n");
            Logger.getLogger(this.getClass()).debug("  - Id: " + returnedVideo.getId());
            Logger.getLogger(this.getClass()).debug("  - Title: " + returnedVideo.getSnippet().getTitle());
            Logger.getLogger(this.getClass()).debug("  - Tags: " + returnedVideo.getSnippet().getTags());
            Logger.getLogger(this.getClass()).debug("  - Privacy Status: " + returnedVideo.getStatus().getPrivacyStatus());
            video.setUploadDate(new Date());
            video.setYoutubeId(returnedVideo.getId());
            return video;

        } catch (GoogleJsonResponseException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (Throwable t) {
            t.printStackTrace();
        }
        return null;
    }

    @Override
    public void persist(VideoMeta meta) {
        repo.save(meta);
    }

    @Override
    public void delete(Long id) {
        setHidden(id, true);
    }

    @Override
    public void restore(Long id) {
        setHidden(id, false);
    }

    private void setHidden(Long id, boolean hidden) {
        VideoMeta video = repo.findOne(id).get();
        User currentUser = UtilsSecurity.getUser();
        if (video.getCreator().getId() == currentUser.getId() || currentUser.getRoles().contains(RoleName.ROLE_ADMIN)) {
            video.setHidden(hidden);
        } else {
            throw new AccessDeniedException("Недостаточно прав для " + (hidden ? "удаления" : "восстановления") + " видео.");
        }
    }

    @Override
    public List<VideoMetaDto> getList() {
        List<VideoMeta> metaList = repo.findAll(new Sort(Sort.Direction.DESC, "id"));
        if (metaList != null) {
            return metaList.stream().map(elem -> {
                VideoMetaDto dto = mapper.map(elem, VideoMetaDto.class);
                dto.setCreatorName(elem.getCreator().getFullName());
                dto.setCommentCount(elem.getCommentsCount());
                return dto;
            }).collect(Collectors.toList());
        }
        return new ArrayList<>();
    }

    @Override
    public List<CommentDto> getComments(Long videoId) {
        List<Comment> comments = commentRepo.findByVideoIdOrderByIdDesc(videoId);
        if (!CollectionUtils.isEmpty(comments)) {
            return comments.stream().map(elem -> {
                CommentDto dto = mapper.map(elem, CommentDto.class);
                return dto;
            }).collect(Collectors.toList());
        }
        return new ArrayList<>();
    }

    @Override
    public CommentDto addComment(CommentDto dto) {
        Long currentUserId = UtilsSecurity.getUser().getId();
        dto.setAuthor(currentUserId);
        dto.setDate(new Date());
        Comment comment = new Comment();
        mapper.map(dto, comment);
        return mapper.map(commentRepo.save(comment), CommentDto.class);

    }
}
