package ru.splashcourse.liubachka.logics.pages.model;

import java.util.List;

import lombok.Data;

@Data
public class PageDto {

    private Long id;

    private String name;

    private List<PageElementDto> children;

}
