package ru.splashcourse.liubachka.configs.security.users;

import lombok.Data;

import ru.splashcourse.liubachka.ObjectWithId;

/**
 * UserDto
 */
@Data
public class UserDto implements ObjectWithId {

    private Long id;

    private String username;

    private String password;

    private String firstName;

    private String lastName;

    private boolean enabled = true;

    private String email;

    private String roles = "";
}
