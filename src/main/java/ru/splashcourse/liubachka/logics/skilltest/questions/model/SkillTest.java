package ru.splashcourse.liubachka.logics.skilltest.questions.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.hibernate.validator.constraints.NotBlank;
import org.springframework.util.CollectionUtils;

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

    public static final Long DATA_FORMAT_VERSION = 1L;

    @Column(name = "test_name", unique = true)
    @NotBlank
    private String testName;

    private Long version;

    @OneToMany(mappedBy = "skillTest", cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REMOVE}, fetch = FetchType.EAGER)
    @Fetch(FetchMode.SUBSELECT)
    private List<Question> questions;

    private boolean hidden;

    public void setQuestions(List<Question> questions) {
        if (!CollectionUtils.isEmpty(questions)) {
            questions.forEach(q -> q.setSkillTest(this));
        }
        this.questions = questions;
    }
}
