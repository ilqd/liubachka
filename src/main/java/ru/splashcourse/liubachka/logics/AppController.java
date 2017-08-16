package ru.splashcourse.liubachka.logics;

import org.springframework.beans.factory.annotation.Autowired;
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

    @RequestMapping(value = {"/", "login", "/page/**", "/admin/**", "/skilltest/**"}, method = RequestMethod.GET)
    public String index() {
        return "forward:/index.html";
    }

    @RequestMapping(value = "/admin/init")
    public void init() {
        if (!userRepo.findByUsername("admin").isPresent()) {
            User user = new User();
            user.setUsername("admin");
            user.setPassword(passwordEncoder.encode("adminInitPass"));
            user.setEnabled(true);
            user.setRoles(Sets.newHashSet(RoleName.ROLE_ADMIN));
            user.setFirstName("admin");
            user.setLastName("admin");
            userRepo.save(user);
        }
    }
}
