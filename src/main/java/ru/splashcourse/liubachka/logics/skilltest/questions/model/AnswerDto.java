package ru.splashcourse.liubachka.logics.skilltest.questions.model;

import lombok.Data;
import ru.splashcourse.liubachka.ObjectWithId;

@Data
public class AnswerDto implements ObjectWithId {

	private Long id;

	private String text;

	private Boolean correct = false;
}
