package ru.splashcourse.liubachka.logics.skilltest.results.model;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import ru.splashcourse.liubachka.ObjectWithIdImpl;
import ru.splashcourse.liubachka.logics.skilltest.questions.model.Answer;
import ru.splashcourse.liubachka.logics.skilltest.questions.model.Question;

@Entity
@ToString()
@EqualsAndHashCode(callSuper = true)
@Setter
@Getter
public class AnsweredQuestion extends ObjectWithIdImpl {

    @ManyToOne
    private Question question;

    @ManyToOne
    private Answer answer;

    @ManyToMany
    private List<Answer> multipleAnswers;

    private String textAnswer;

}
