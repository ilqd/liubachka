package ru.splashcourse.liubachka.logics.skilltest.questions.model;

import javax.persistence.Entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import ru.splashcourse.liubachka.ObjectWithIdImpl;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
public class Answer extends ObjectWithIdImpl {

	private String text;

	private boolean correct;
}
