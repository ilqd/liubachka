package ru.splashcourse.liubachka.logics.skilltest.questions.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.ManyToOne;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import ru.splashcourse.liubachka.ObjectWithIdImpl;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class SkillTestSystemAssignments extends ObjectWithIdImpl {

    @Enumerated(EnumType.STRING)
    @Column(unique = true)
    private SkillTestSystemTypes type;

    @ManyToOne
    private SkillTest test;

}
