package ru.splashcourse.liubachka.logics.video.model;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;

@ToString()
@EqualsAndHashCode
@Setter
@Getter
public class CommentDto {

    private Long id;

    private Long author;

    private String authorName;

    private String text;

    private Date date;

    private Long video;

}
