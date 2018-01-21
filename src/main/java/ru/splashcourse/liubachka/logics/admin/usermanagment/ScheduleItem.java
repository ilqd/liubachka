package ru.splashcourse.liubachka.logics.admin.usermanagment;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.DayOfWeek;
import java.util.Date;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import ru.splashcourse.liubachka.ObjectWithIdImpl;

@Entity
@ToString()
@EqualsAndHashCode(callSuper = true)
@Setter
@Getter
public class ScheduleItem extends ObjectWithIdImpl {

    private String name;

    private Integer durationMinutes;

    @Temporal(TemporalType.TIMESTAMP)
    private Date date;

    private Boolean recurring;

    @ElementCollection
    private Set<DayOfWeek> recurringDays;

    @Lob
    private String description;

    @ManyToMany(cascade = CascadeType.ALL, mappedBy = "sheduleItemsAsStudent")
    private List<User> student;

    @ManyToMany(cascade = CascadeType.ALL, mappedBy = "sheduleItems")
    private List<UserGroup> userGroup;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User teacher;
}
