package ru.splashcourse.liubachka.logics.skilltest.questions.model;

import java.util.List;

import javax.persistence.OneToMany;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString()
@EqualsAndHashCode
@Setter
@Getter
public class QuestionDto {

    private Long id;

    private String question;

    private Integer pointsAwarded;

    private String answerType;

    @OneToMany
    private List<AnswerDto> answers;

    private List<String> correctAnswers;
}
