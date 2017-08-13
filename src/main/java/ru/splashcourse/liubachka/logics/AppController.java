package ru.splashcourse.liubachka.logics;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class AppController {

    @RequestMapping(value = {"/", "/page/**", "/admin/**", "/skilltest/**"}, method = RequestMethod.GET)
    public String index() {
        return "forward:/index.html";
    }
}
