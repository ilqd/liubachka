package ru.splashcourse.liubachka.logics.skilltest.results.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.OneToMany;

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
public class TestResult extends ObjectWithIdImpl {

    private String personName;

    private String phone;

    private String email;

    @OneToMany(cascade = CascadeType.ALL)
    private List<AnsweredQuestion> anweredQuestions;
}
