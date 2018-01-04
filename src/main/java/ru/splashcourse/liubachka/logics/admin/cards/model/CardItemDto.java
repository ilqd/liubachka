package ru.splashcourse.liubachka.logics.admin.cards.model;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString()
@EqualsAndHashCode
@Setter
@Getter
public class CardItemDto {

    private Long id;

    private Long folder;

    private String text;

    private String label;

    private Integer linesPerCard = 10;

    private Integer width = 200;

    private String separator;

    private String name;

}
