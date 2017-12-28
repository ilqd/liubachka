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
@RequestMapping(path = "/api/users")
public class UserController {

    @Autowired
    private UserService service;

    @RequestMapping(method = RequestMethod.GET)
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public List<UserProjection> findAll() {
        return service.findAll();
    }

    @RequestMapping(method = RequestMethod.GET, path = "/list")
    @PreAuthorize("isAuthenticated()")
    public List<UserFullNameAndIdProjection> findAllFullnames() {
        return service.findAllFullnames();
    }

    @RequestMapping(method = RequestMethod.GET, path = "/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public UserDto findById(@PathVariable long id) {
        return service.findById(id);
    }

    @RequestMapping(method = RequestMethod.POST)
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public void create(@RequestBody UserDto dto) {
        service.create(dto);
    }

    @RequestMapping(method = RequestMethod.PUT)
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public void update(@RequestBody UserDto dto) {
        service.update(dto);
    }

}
