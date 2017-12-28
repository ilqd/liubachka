package ru.splashcourse.liubachka.logics.video.model;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;

import ru.splashcourse.liubachka.ObjectWithIdImpl;

@Entity
@ToString()
@EqualsAndHashCode(callSuper = true)
@Setter
@Getter
public class VideoCategory extends ObjectWithIdImpl {
    @Column(nullable = false, unique = true)
    private String name;

    private Boolean hidden = false;

}
