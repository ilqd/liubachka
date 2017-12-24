package ru.splashcourse.liubachka.logics.video;

import org.springframework.web.multipart.MultipartFile;

import java.io.OutputStream;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import ru.splashcourse.liubachka.logics.video.model.CommentDto;
import ru.splashcourse.liubachka.logics.video.model.VideoMeta;
import ru.splashcourse.liubachka.logics.video.model.VideoMetaDto;

public interface VideoService {

    VideoMeta upload(VideoMetaDto meta, MultipartFile file, OutputStream progressOutStream, HttpServletResponse response);

    void persist(VideoMeta meta);

    void delete(Long id);

    List<VideoMetaDto> getList();

    void restore(Long id);

    List<CommentDto> getComments(Long videoId);

    CommentDto addComment(CommentDto dto);
}
