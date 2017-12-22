package ru.splashcourse.liubachka.logics.video.model;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import org.hibernate.annotations.Type;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;

import ru.splashcourse.liubachka.ObjectWithIdImpl;
import ru.splashcourse.liubachka.logics.admin.usermanagment.User;

@Entity
@ToString()
@EqualsAndHashCode(callSuper = true)
@Setter
@Getter
public class VideoMeta extends ObjectWithIdImpl {

    public VideoMeta() {
        super();
    }

    public VideoMeta(VideoMetaDto dto) {
        super();
        this.name = dto.getName();
        this.description = dto.getDescription();
    }

    @ManyToOne(fetch = FetchType.EAGER)
    private User creator;

    private String youtubeId;

    private String name;

    @Type(type = "text")
    private String description;

    private Date uploadDate;

    @OneToMany(mappedBy = "video", orphanRemoval = true, cascade = CascadeType.ALL)
    @OrderBy(value = "date DESC")
    private List<Comment> comments;

    private Boolean hidden = false;

    public void setComments(List<Comment> comments) {
        if (comments != null) {
            comments.forEach(comment -> comment.setVideo(this));
        }
        this.comments = comments;
    }

}
