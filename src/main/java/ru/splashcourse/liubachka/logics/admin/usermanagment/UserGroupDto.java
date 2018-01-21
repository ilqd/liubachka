package ru.splashcourse.liubachka.logics.admin.usermanagment;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import lombok.Data;

import java.util.List;

@Data
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id", scope = UserGroupDto.class)
public class UserGroupDto {

    private Long id;

    private List<Long> users;

    private String name;

    private List<ScheduleItemDto> sheduleItems;

}
