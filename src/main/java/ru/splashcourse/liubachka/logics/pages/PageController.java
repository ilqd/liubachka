package ru.splashcourse.liubachka.logics.pages;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/page")
public class PageController {

    @Autowired
    private PageService service;

    @RequestMapping(value = "/mappings")
    public Map<String, String> getAllMapping() {
        return service.getAllMappings();
    }

    @RequestMapping(value = "/createPage")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public void createPage(@RequestParam String name) {
        service.createPage(name);
    }

    @RequestMapping(value = "/mapPage")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public void mapPage(@RequestParam String url, @RequestParam Long pageId) {
        service.setPageForUrl(url, pageId);
    }

}
