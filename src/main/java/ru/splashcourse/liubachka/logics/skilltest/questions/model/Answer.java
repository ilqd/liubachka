package ru.splashcourse.liubachka.logics.skilltest.questions.model;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import ru.splashcourse.liubachka.ObjectWithIdImpl;

@Entity
@ToString()
@EqualsAndHashCode(callSuper = true)
@Setter
@Getter
public class Answer extends ObjectWithIdImpl {

    private String text;

    private boolean correct;

    @ManyToOne
    @JoinColumn(name = "question_id")
    private Question question;
}
