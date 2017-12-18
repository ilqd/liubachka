package ru.splashcourse.liubachka.logics.video.model;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import org.hibernate.annotations.Type;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;

import ru.splashcourse.liubachka.ObjectWithIdImpl;
import ru.splashcourse.liubachka.logics.admin.usermanagment.User;

@Entity
@ToString()
@EqualsAndHashCode(callSuper = true)
@Setter
@Getter
public class Comment extends ObjectWithIdImpl {

    @ManyToOne(fetch = FetchType.EAGER)
    private User author;

    @Type(type = "text")
    private String text;

    private Date date;

    @ManyToOne
    private VideoMeta video;

}
