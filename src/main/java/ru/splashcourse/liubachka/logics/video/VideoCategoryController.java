package ru.splashcourse.liubachka.logics.video;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import ru.splashcourse.liubachka.logics.video.model.VideoCategoryDto;

@RestController
@RequestMapping("/api/videoCategory")
public class VideoCategoryController {

    @Autowired
    private VideoCategoryService service;

    @RequestMapping(method = RequestMethod.POST, produces = "application/json")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public void create(@RequestBody VideoCategoryDto dto) {
        service.create(dto);
    }

    @RequestMapping(method = RequestMethod.PATCH, produces = "application/json")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public void update(@RequestBody VideoCategoryDto dto) {
        service.update(dto);
    }

    @RequestMapping(value = "/delete/{id}", method = RequestMethod.PATCH, produces = "application/json")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public void delete(Long id) {
        service.delete(id);
    }

    @RequestMapping(value = "/restore/{id}", method = RequestMethod.PATCH, produces = "application/json")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public void restore(Long id) {
        service.restore(id);
    }

    @RequestMapping(produces = "application/json")
    @PreAuthorize("isAuthenticated()")
    public List<VideoCategoryDto> getAll() {
        return service.getAll();
    }

    @RequestMapping(value = "/{id}", produces = "application/json")
    @PreAuthorize("isAuthenticated()")
    public VideoCategoryDto getOne(@PathVariable Long id) {
        return service.getOne(id);
    }

}
