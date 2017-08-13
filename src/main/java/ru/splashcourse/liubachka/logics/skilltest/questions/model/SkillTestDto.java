package ru.splashcourse.liubachka.logics.skilltest.questions.model;

import java.util.List;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString()
@EqualsAndHashCode
@Setter
@Getter
public class SkillTestDto {

    private Long id;

    private String testName;

    private Long version;

    private List<QuestionDto> questions;

    private Boolean hidden = false;
}
