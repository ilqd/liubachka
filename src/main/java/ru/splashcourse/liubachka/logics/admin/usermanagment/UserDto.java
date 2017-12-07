package ru.splashcourse.liubachka.logics.admin.usermanagment;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import lombok.Data;

import java.util.List;
import java.util.Set;

import ru.splashcourse.liubachka.ObjectWithId;
import ru.splashcourse.liubachka.configs.role.RoleName;

/**
 * UserDto
 */
@Data
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id", scope = UserDto.class)
public class UserDto implements ObjectWithId {

    private Long id;

    private String username;

    private String password;

    private String firstName;

    private String lastName;

    private boolean enabled = true;

    private String email;

    private Set<RoleName> roles;

    private List<ScheduleItemDto> sheduleItems;
}
