package ru.splashcourse.liubachka.logics.video.model;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString()
@EqualsAndHashCode
@Setter
@Getter
public class VideoCategoryDto {

    private Long id;

    private String name;

    private Boolean hidden = false;

}
