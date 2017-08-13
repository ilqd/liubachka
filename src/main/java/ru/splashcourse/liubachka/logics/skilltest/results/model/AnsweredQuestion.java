package ru.splashcourse.liubachka.logics.skilltest.results.model;

import javax.persistence.Entity;

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
public class AnsweredQuestion extends ObjectWithIdImpl {

}
