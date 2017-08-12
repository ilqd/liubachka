package ru.splashcourse.liubachka.logics.skilltest.results.model;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.OneToMany;

import lombok.Data;
import lombok.EqualsAndHashCode;
import ru.splashcourse.liubachka.ObjectWithIdImpl;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
public class TestResult extends ObjectWithIdImpl {

	private String personName;

	private String phone;

	private String email;

	@OneToMany
	private List<AnsweredQuestion> anweredQuestions;
}
