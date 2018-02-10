package ru.splashcourse.liubachka.logics.admin.usermanagment;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import lombok.Data;

import java.time.DayOfWeek;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Data
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id", scope = ScheduleItemDto.class)
public class ScheduleItemDto {

    private Long id;

    private String name;

    private Integer durationMinutes;

    private Date date;

    private Boolean recurring;

    private Set<DayOfWeek> recurringDays;

    private String description;

    private List<Long> student;

    private List<UserDto> studentDto;

    private Long userGroup;

    private UserGroup userGroupDto;

    private Long teacher;

    private UserDto teacherDto;

}
