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
public class VideoMetaDto {

    private Long id;

    private Long creator;

    private String creatorName;

    private String youtubeId;

    private String name;

    private String description;

    private Date uploadDate;

    private Boolean hidden;

    private Integer commentCount;

    private Long category;

    private String categoryName;

}
