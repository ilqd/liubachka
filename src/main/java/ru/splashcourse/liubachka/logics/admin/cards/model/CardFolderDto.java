package ru.splashcourse.liubachka.logics.admin.cards.model;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@ToString()
@EqualsAndHashCode
@Setter
@Getter
public class CardFolderDto {

    private Long id;

    private String name;

    private List<CardItemDto> cards;

    private List<CardFolderDto> children;

    private Long parent;

    private Boolean hidden = false;

    private Boolean finalized = false;
}
