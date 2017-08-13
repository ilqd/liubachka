package ru.splashcourse.liubachka.logics.skilltest.questions.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToMany;

import org.hibernate.validator.constraints.NotBlank;

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
public class SkillTest extends ObjectWithIdImpl {

    @Column(name = "test_name", unique = true)
    @NotBlank
    private String testName;

    private Long version;

    @ManyToMany(cascade = CascadeType.ALL)
    private List<Question> questions;

    private boolean hidden;
}
