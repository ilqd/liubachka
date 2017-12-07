package ru.splashcourse.liubachka.logics.admin.usermanagment;

import ma.glasnost.orika.CustomMapper;

import org.springframework.stereotype.Component;

@Component
public class UserDtoMapper extends CustomMapper<User, UserDto> {

}
