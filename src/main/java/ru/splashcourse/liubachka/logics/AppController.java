package ru.splashcourse.liubachka.logics;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.google.common.collect.Sets;

import ru.splashcourse.liubachka.configs.role.RoleName;
import ru.splashcourse.liubachka.configs.security.users.User;
import ru.splashcourse.liubachka.configs.security.users.UserRepository;

@Controller
public class AppController {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @RequestMapping(value = {"/", "/loginRedirect", "/login", "/page/**", "/skilltest/**"}, method = RequestMethod.GET)
    public String index(HttpServletResponse response) {
        return "forward:/index.html";
    }

    @RequestMapping(value = "/init")
    public String init() {
        if (!userRepo.findByUsername("admin").isPresent()) {
            User user = new User();
            user.setUsername("admin");
            user.setPassword(passwordEncoder.encode("adminInitPa33"));
            user.setEnabled(true);
            user.setRoles(Sets.newHashSet(RoleName.ROLE_ADMIN));
            user.setFirstName("admin");
            user.setLastName("admin");
            userRepo.save(user);
        }
        return "forward:/index.html";
    }

    @RequestMapping(value = {"/admin/**"}, method = RequestMethod.GET)
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public String admin() {
        return "forward:/index.html";
    }

}
