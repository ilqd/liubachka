package ru.splashcourse.liubachka.configs.orika;

import ma.glasnost.orika.CustomMapper;
import ma.glasnost.orika.MappingContext;

import org.hibernate.collection.internal.PersistentBag;

import java.util.Collection;

import ru.splashcourse.liubachka.logics.video.model.CommentDto;

/**
 * маппер для нестед коллекций {@link Comment} в {@link CommentDto}
 * 
 * @author ikudimov
 *
 */
public class CommentToDtoCollectionMapper extends CustomMapper<PersistentBag, Collection<CommentDto>> {
    @SuppressWarnings("unchecked")
    @Override
    public void mapAtoB(PersistentBag a, Collection<CommentDto> b, MappingContext context) {
        a.forEach(elem -> {
            b.add(mapperFacade.map(elem, CommentDto.class));
        });
    }
}
