package ru.splashcourse.liubachka.logics.pages.model;

import java.util.List;

import lombok.Data;

@Data
public class PageElementDto {

    private Long id;

    private String type;

    private String name;

    private int elementOrder = 1;

    private String params;

    private String style;

    private List<PageElementDto> children;

    private String content;
}
