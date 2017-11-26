package ru.splashcourse.liubachka.configs.security.users;

import lombok.Data;

import java.util.Set;

import ru.splashcourse.liubachka.ObjectWithId;
import ru.splashcourse.liubachka.configs.role.RoleName;

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

    private Set<RoleName> roles;
}
