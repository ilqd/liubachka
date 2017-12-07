package ru.splashcourse.liubachka.logics.admin.usermanagment;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;

import ru.splashcourse.liubachka.ObjectWithIdImpl;

@Entity
@ToString()
@EqualsAndHashCode(callSuper = true)
@Setter
@Getter
public class UserGroup extends ObjectWithIdImpl {

    @ManyToMany
    private List<User> users;

    private String name;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "group_schedule_items", joinColumns = @JoinColumn(name = "group_id"), inverseJoinColumns = @JoinColumn(name = "schedule_item_id"))
    @Fetch(FetchMode.SUBSELECT)
    private List<ScheduleItem> sheduleItems;
}
