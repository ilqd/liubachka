package ru.splashcourse.liubachka.logics.skilltest.questions.model;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import ru.splashcourse.liubachka.ObjectWithId;

@ToString()
@EqualsAndHashCode
@Setter
@Getter
public class AnswerDto implements ObjectWithId {

    private Long id;

    private String text;

    private Boolean correct = false;
}
