package ru.splashcourse.liubachka.logics.skilltest.questions.model;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.hibernate.annotations.Type;
import org.springframework.util.CollectionUtils;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import ru.splashcourse.liubachka.ObjectWithIdImpl;

@Entity
@ToString()
@EqualsAndHashCode(callSuper = true)
@Setter
@Getter
public class Question extends ObjectWithIdImpl {

    @Type(type = "text")
    private String question;

    private Integer pointsAwarded;

    @Enumerated(EnumType.STRING)
    private AnswerType answerType;

    @OneToMany(mappedBy = "question", cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REMOVE}, fetch = FetchType.EAGER)
    @Fetch(FetchMode.SUBSELECT)
    private List<Answer> answers;

    @ElementCollection(targetClass = String.class)
    private List<String> correctAnswers;

    @ManyToOne
    @JoinColumn(name = "skill_test_id")
    private SkillTest skillTest;

    public void setAnswers(List<Answer> answers) {
        if (!CollectionUtils.isEmpty(answers)) {
            answers.forEach(q -> q.setQuestion(this));
        }
        this.answers = answers;
    }
}
