package ru.splashcourse.liuback.logics.skilltest.results.model;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;

import lombok.Data;
import lombok.EqualsAndHashCode;
import ru.splashcourse.liuback.ObjectWithIdImpl;
import ru.splashcourse.liuback.logics.skilltest.questions.model.Answer;
import ru.splashcourse.liuback.logics.skilltest.questions.model.Question;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
public class AnsweredQuestion extends ObjectWithIdImpl {

	@ManyToOne
	private Question question;

	@ManyToOne
	private Answer answer;

	@ManyToMany
	private List<Answer> multipleAnswers;

	private String textAnswer;

}
