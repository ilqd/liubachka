package ru.splashcourse.liuback.logics.skilltest.questions.model;

import java.util.List;

import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.ManyToMany;

import lombok.Data;
import lombok.EqualsAndHashCode;
import ru.splashcourse.liuback.ObjectWithIdImpl;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
public class Question extends ObjectWithIdImpl {

	private String question;

	private Integer pointsAwarded;

	@Enumerated(EnumType.STRING)
	private AnswerType answerType;

	@ManyToMany
	private List<Answer> answers;

	@ElementCollection(targetClass = String.class)
	private List<String> correctAnswers;
}
