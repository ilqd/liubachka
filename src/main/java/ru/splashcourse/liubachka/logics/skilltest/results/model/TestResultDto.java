package ru.splashcourse.liubachka.logics.skilltest.results.model;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import ru.splashcourse.liubachka.logics.skilltest.questions.model.SkillTest;

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

    private boolean interested = false;

    private boolean hasBeenCalled = false;

    private boolean willCome = false;

    private Long testSnapShotDataVersion = SkillTest.DATA_FORMAT_VERSION;

    private String testSnapShotDto;

    private String resultsSnapShotDto;

    private Integer correctAnswers;
    private Integer totalQuestions;

    private Integer pointsEarned;
    private Integer totalPoints;

    private String testName;

    private String testType;
}
