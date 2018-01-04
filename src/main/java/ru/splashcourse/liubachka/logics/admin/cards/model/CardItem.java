package ru.splashcourse.liubachka.logics.admin.cards.model;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import org.hibernate.validator.constraints.NotBlank;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;

import ru.splashcourse.liubachka.ObjectWithIdImpl;

@Entity
@ToString()
@EqualsAndHashCode(callSuper = true)
@Setter
@Getter
public class CardItem extends ObjectWithIdImpl {

    @ManyToOne
    private CardFolder folder;

    private String text;

    private String label;

    private Integer linesPerCard = 10;

    private Integer width = 200;

    private String separator;

    @NotBlank
    private String name;

}
