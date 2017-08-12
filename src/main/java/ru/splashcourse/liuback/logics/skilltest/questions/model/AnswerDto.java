package ru.splashcourse.liuback.logics.skilltest.questions.model;

import lombok.Data;
import ru.splashcourse.liuback.ObjectWithId;

@Data
public class AnswerDto implements ObjectWithId {

	private Long id;

	private String text;

	private Boolean correct = false;
}
