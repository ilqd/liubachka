package ru.splashcourse.liubachka.logics.skilltest.questions.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.ManyToMany;

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
public class Question extends ObjectWithIdImpl {

    private String question;

    private Integer pointsAwarded;

    @Enumerated(EnumType.STRING)
    private AnswerType answerType;

    @ManyToMany(cascade = CascadeType.ALL)
    private List<Answer> answers;

    @ElementCollection(targetClass = String.class)
    private List<String> correctAnswers;
}
