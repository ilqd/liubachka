package ru.splashcourse.liubachka.logics.video;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

import ru.splashcourse.liubachka.logics.video.model.VideoMetaDto;

@RestController
@RequestMapping(value = "/api/video")
public class VideoController {

    @Autowired
    private UploadVideoService service;

    @RequestMapping(value = "/upload", method = RequestMethod.POST)
    @PreAuthorize("isAuthenticated()")
    public void upload(@RequestPart("meta") VideoMetaDto meta, @RequestPart("file") MultipartFile file) {
        service.upload(meta, file);
    }

    @RequestMapping(value = "/list")
    @PreAuthorize("isAuthenticated()")
    public List<VideoMetaDto> getList() {
        List<VideoMetaDto> result = service.getList();
        return result;
    }
}
