package ru.splashcourse.liubachka.logics.video;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import ru.splashcourse.liubachka.logics.video.model.VideoMeta;
import ru.splashcourse.liubachka.logics.video.model.VideoMetaDto;

@Controller
@RequestMapping(value = "/api/video")
public class VideoController {

    @Autowired
    private UploadVideoService service;

    @RequestMapping(value = "/upload", method = RequestMethod.POST)
    @PreAuthorize("isAuthenticated()")
    public void upload(@RequestPart("meta") VideoMetaDto meta, @RequestPart("file") MultipartFile file, HttpServletResponse response)
            throws IOException {
        VideoMeta result = service.upload(meta, file, response.getOutputStream(), response);
        service.persist(result);
    }

    @RequestMapping(value = "/list", produces = "application/json")
    @PreAuthorize("isAuthenticated()")
    public @ResponseBody List<VideoMetaDto> getList() {
        List<VideoMetaDto> result = service.getList();
        return result;
    }
}
