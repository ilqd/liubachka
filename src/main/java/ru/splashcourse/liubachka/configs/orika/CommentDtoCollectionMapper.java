package ru.splashcourse.liubachka.configs.orika;

import ma.glasnost.orika.metadata.Type;
import ma.glasnost.orika.metadata.TypeBuilder;

import org.springframework.data.repository.support.DomainClassConverter;

import java.util.Collection;

import ru.splashcourse.liubachka.logics.video.model.Comment;
import ru.splashcourse.liubachka.logics.video.model.CommentDto;

/**
 * Маппер для {@link CommentDto}
 * 
 * @author ikudimov
 *
 */
public class CommentDtoCollectionMapper extends DtoToCollectionMapper<CommentDto, Comment> {

    @Override
    public Type<Collection<CommentDto>> getAType() {
        TypeBuilder builder = new TypeBuilder<Collection<CommentDto>>() {
        };
        return builder.build();
    }

    @Override
    public Type<Collection> getBType() {
        TypeBuilder builder = new TypeBuilder<Collection<Comment>>() {
        };
        return builder.build();
    }

    public CommentDtoCollectionMapper(DomainClassConverter domainClassConverter) {
        super(domainClassConverter);
    }

    @Override
    protected Class<Comment> getEntityClass() {
        return Comment.class;
    }

}
