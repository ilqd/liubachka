package ru.splashcourse.liubachka.logics.pages.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;

import org.hibernate.validator.constraints.NotBlank;
import org.springframework.util.CollectionUtils;

import lombok.Data;
import lombok.EqualsAndHashCode;
import ru.splashcourse.liubachka.ObjectWithIdImpl;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
public class Page extends ObjectWithIdImpl {

    public void setChildren(List<PageElement> children) {
        if (!CollectionUtils.isEmpty(children)) {
            children.forEach(child -> child.setParentPage(this));
        }
        this.children = children;
    }

    @Column(unique = true)
    @NotBlank
    private String name;

    @OneToMany(cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    private List<PageElement> children;

    @Column(unique = true)
    private String url;

    private boolean hidden = false;

}
