package ru.splashcourse.liubachka.logics.skilltest.results.model;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString()
@EqualsAndHashCode
@Setter
@Getter
public class TestResultDto {

    private Long id;

    private String personName;

    private String phone;

    private String email;

    private Integer age;

    private boolean isInterested = false;

    private boolean hasBeenCalled = false;

    private boolean willCome = false;

    private String testSnapShotDto;

    private String resultsSnapShotDto;
}
