package ru.splashcourse.liubachka.logics.video;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import ru.splashcourse.liubachka.logics.video.model.CommentDto;
import ru.splashcourse.liubachka.logics.video.model.VideoMeta;
import ru.splashcourse.liubachka.logics.video.model.VideoMetaDto;

@RestController
@RequestMapping(value = "/api/video")
public class VideoController {

    @Autowired
    private VideoService service;

    @RequestMapping(value = "/upload", method = RequestMethod.POST)
    @PreAuthorize("isAuthenticated()")
    public void upload(@RequestPart("meta") VideoMetaDto meta, @RequestPart("file") MultipartFile file, HttpServletResponse response)
            throws IOException {
        VideoMeta result = service.upload(meta, file, response.getOutputStream(), response);
        service.persist(result);
    }

    @RequestMapping(value = "/list", produces = "application/json")
    @PreAuthorize("isAuthenticated()")
    public List<VideoMetaDto> getList() {
        List<VideoMetaDto> result = service.getList();
        return result;
    }

    @RequestMapping(method = RequestMethod.PATCH, value = "/delete/{id}")
    @PreAuthorize("isAuthenticated()")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    @RequestMapping(method = RequestMethod.PATCH, value = "/restore/{id}")
    @PreAuthorize("isAuthenticated()")
    public void restore(@PathVariable Long id) {
        service.restore(id);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/comments")
    @PreAuthorize("isAuthenticated()")
    public CommentDto addComment(@RequestBody CommentDto dto) {
        return service.addComment(dto);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/comments/{videoId}")
    @PreAuthorize("isAuthenticated()")
    public List<CommentDto> getComments(@PathVariable Long videoId) {
        return service.getComments(videoId);
    }
}
