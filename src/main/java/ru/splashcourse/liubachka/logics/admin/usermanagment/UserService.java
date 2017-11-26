package ru.splashcourse.liubachka.logics.admin.usermanagment;

import java.util.List;

import ru.splashcourse.liubachka.configs.security.users.User;
import ru.splashcourse.liubachka.configs.security.users.UserDto;
import ru.splashcourse.liubachka.configs.security.users.UserProjection;

public interface UserService {

    List<UserProjection> findAll();

    User findById(Long id);

    void create(UserDto dto);

    void update(UserDto dto);

}
