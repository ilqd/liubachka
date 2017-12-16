package ru.splashcourse.liubachka.logics.video;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(value = "/api/video")
public class VideoController {

    @Autowired
    private UploadVideoService service;

    @RequestMapping(value = "/upload")
    public void upload() {
        service.upload();
    }
}
