package ru.splashcourse.liubachka.logics;

import org.springframework.boot.autoconfigure.web.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class BaseErrorController implements ErrorController {

    @RequestMapping("/error")
    public String index() {
        return "forward:/index.html?404";
    }

    @Override
    public String getErrorPath() {
        return "index.html?404";
    }

}
