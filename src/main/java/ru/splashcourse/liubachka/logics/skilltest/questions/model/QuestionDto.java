package ru.splashcourse.liubachka.logics.skilltest.questions.model;

import java.util.List;

import javax.persistence.OneToMany;

import lombok.Data;
import ru.splashcourse.liubachka.ObjectWithId;

@Data
public class QuestionDto implements ObjectWithId {

	private Long id;

	private String question;

	private Integer pointsAwarded;

	private String answerType;

	@OneToMany
	private List<AnswerDto> answers;

	private List<String> correctAnswers;
}
