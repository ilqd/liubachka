package ru.splashcourse.liubachka.logics.admin.usermanagment;

import ma.glasnost.orika.CustomMapper;

import org.springframework.stereotype.Component;

import ru.splashcourse.liubachka.configs.security.users.User;
import ru.splashcourse.liubachka.configs.security.users.UserDto;

@Component
public class UserDtoMapper extends CustomMapper<User, UserDto> {

}
