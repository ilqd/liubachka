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
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.services.youtube.YouTube;
import com.google.api.services.youtube.model.Video;
import com.google.api.services.youtube.model.VideoSnippet;
import com.google.api.services.youtube.model.VideoStatus;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.security.GeneralSecurityException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import ru.splashcourse.liubachka.configs.orika.OrikaBeanMapper;
import ru.splashcourse.liubachka.logics.admin.usermanagment.User;
import ru.splashcourse.liubachka.logics.video.model.VideoMeta;
import ru.splashcourse.liubachka.logics.video.model.VideoMetaDto;
import ru.splashcourse.liubachka.logics.video.model.VideoMetaRepository;
import ru.splashcourse.liubachka.utils.UtilsSecurity;

@Service
public class UploadVideoService {

    /**
     * Define a global instance of the HTTP transport.
     */
    public static final HttpTransport HTTP_TRANSPORT = new NetHttpTransport();

    /**
     * Define a global instance of the JSON factory.
     */
    public static final JsonFactory JSON_FACTORY = new JacksonFactory();

    /**
     * Define a global variable that specifies the MIME type of the video being uploaded.
     */
    private static final String VIDEO_FILE_FORMAT = "video/*";

    @Value("${liu.google.refreshToken}")
    private String googleRefreshToken;

    @Autowired
    private VideoMetaRepository repo;

    @Autowired
    protected OrikaBeanMapper mapper;

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

    public void upload(VideoMetaDto meta, MultipartFile file) {
        try {
            VideoMeta video = new VideoMeta(meta);
            User creator = UtilsSecurity.getUser();
            video.setCreator(creator);

            Credential cred = generateCredentialWithUserApprovedToken();
            cred.refreshToken();
            YouTube youtube = new YouTube.Builder(HTTP_TRANSPORT, JSON_FACTORY, cred).setApplicationName("splashcourse").build();

            System.out.println("Uploading: " + meta.getName());

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
                            System.out.println("Initiation Started");
                            break;
                        case INITIATION_COMPLETE:
                            System.out.println("Initiation Completed");
                            break;
                        case MEDIA_IN_PROGRESS:
                            System.out.println("Upload in progress");
                            System.out.println("Upload percentage: " + uploader.getProgress());
                            break;
                        case MEDIA_COMPLETE:
                            System.out.println("Upload Completed!");
                            break;
                        case NOT_STARTED:
                            System.out.println("Upload Not Started!");
                            break;
                    }
                }
            };
            uploader.setProgressListener(progressListener);

            // Call the API and upload the video.
            Video returnedVideo = videoInsert.execute();

            // Print data about the newly inserted video from the API response.
            System.out.println("\n================== Returned Video ==================\n");
            System.out.println("  - Id: " + returnedVideo.getId());
            System.out.println("  - Title: " + returnedVideo.getSnippet().getTitle());
            System.out.println("  - Tags: " + returnedVideo.getSnippet().getTags());
            System.out.println("  - Privacy Status: " + returnedVideo.getStatus().getPrivacyStatus());
            System.out.println("  - Video Count: " + returnedVideo.getStatistics().getViewCount());
            video.setUploadDate(new Date());
            video.setYoutubeId(returnedVideo.getId());
            repo.save(video);

        } catch (GoogleJsonResponseException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (Throwable t) {
            t.printStackTrace();
        }
    }

    public List<VideoMetaDto> getList() {
        List<VideoMeta> metaList = repo.findAll();
        if (metaList != null) {
            return metaList.stream().map(elem -> {
                VideoMetaDto dto = mapper.map(elem, VideoMetaDto.class);
                dto.setCreatorName(elem.getCreator().getFullName());
                return dto;
            }).collect(Collectors.toList());
        }
        return new ArrayList<>();
    }
}
