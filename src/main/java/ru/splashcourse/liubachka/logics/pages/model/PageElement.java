package ru.splashcourse.liubachka.logics.pages.model;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import org.hibernate.annotations.Type;
import org.hibernate.validator.constraints.NotBlank;
import org.springframework.util.CollectionUtils;

import lombok.Data;
import lombok.EqualsAndHashCode;
import ru.splashcourse.liubachka.ObjectWithIdImpl;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
public class PageElement extends ObjectWithIdImpl {

    public void setChildren(List<PageElement> children) {
        if (!CollectionUtils.isEmpty(children)) {
            children.forEach(child -> child.setParentElement(this));
        }
        this.children = children;
    }

    @ManyToOne
    private Page parentPage;

    @ManyToOne
    private PageElement parentElement;

    @NotBlank
    @Enumerated(EnumType.STRING)
    private PageElementType type;

    private String name;

    private int elementOrder = 1;

    @Type(type = "text")
    private String params;

    private String style;

    @OneToMany
    private List<PageElement> children;

    @Type(type = "text")
    private String content;
}
