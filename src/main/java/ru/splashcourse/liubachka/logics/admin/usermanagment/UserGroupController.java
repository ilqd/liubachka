package ru.splashcourse.liubachka.logics.admin.usermanagment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "/api/userGroups")
public class UserGroupController {

    @Autowired
    private UserService service;

    @RequestMapping(method = RequestMethod.GET)
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public List<UserGroupDto> findAll() {
        return service.findAllGroups();
    }

    @RequestMapping(method = RequestMethod.GET, path = "/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public UserGroupDto findById(@PathVariable long id) {
        return service.findGroupById(id);
    }

    @RequestMapping(method = RequestMethod.POST)
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public void create(@RequestBody UserGroupDto dto) {
        service.createGroup(dto);
    }

    @RequestMapping(method = RequestMethod.PUT)
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public void update(@RequestBody UserGroupDto dto) {
        service.updateGroup(dto);
    }

}
