package ru.splashcourse.liubachka.logics.pages;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import ru.splashcourse.liubachka.configs.orika.OrikaBeanMapper;
import ru.splashcourse.liubachka.logics.pages.model.Page;
import ru.splashcourse.liubachka.logics.pages.model.PageDto;

@RestController
@RequestMapping(value = "/api/page")
public class PageController {

    @Autowired
    private PageService service;

    @Autowired
    private OrikaBeanMapper mapper;

    @RequestMapping(value = "/listPages")
    public List<PageDto> getAllMapping() {
        return service.getAllMappings();
    }

    @RequestMapping(value = "/adminListPages")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public List<PageDto> getAllPages() {
        return service.getAllPages();
    }

    @RequestMapping(value = "/get/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public PageDto getPage(@PathVariable long id) {
        return service.getPage(id);
    }

    @RequestMapping(value = "/savePage", method = RequestMethod.PUT)
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public PageDto savePage(@RequestBody PageDto dto) {
        Page result = null;
        if (dto.getId() == null) {
            result = service.createPage(dto);
        } else {
            result = service.updatePage(dto);
        }
        return mapper.map(result, PageDto.class);
    }

}
