package ru.splashcourse.liubachka.logics.skilltest.questions.model;

import java.util.List;

import lombok.Data;
import ru.splashcourse.liubachka.ObjectWithId;

@Data
public class SkillTestDto implements ObjectWithId {

	private Long id;

	private String testName;

	private Long version;

	private List<QuestionDto> questions;

	private Boolean hidden = false;
}
