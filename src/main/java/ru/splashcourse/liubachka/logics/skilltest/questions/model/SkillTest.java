package ru.splashcourse.liubachka.logics.skilltest.questions.model;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;

import org.hibernate.validator.constraints.NotBlank;

import lombok.Data;
import lombok.EqualsAndHashCode;
import ru.splashcourse.liubachka.ObjectWithIdImpl;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
public class SkillTest extends ObjectWithIdImpl {

	@Column(name = "test_name", unique = true)
	@NotBlank
	private String testName;

	private Long version;

	@OneToMany
	private List<Question> questions;

	private boolean hidden;
}
