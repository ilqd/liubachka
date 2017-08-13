package ru.splashcourse.liubachka.configs.orika;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.data.repository.support.DomainClassConverter;

import ma.glasnost.orika.CustomMapper;
import ma.glasnost.orika.MappingContext;
import ru.splashcourse.liubachka.ObjectWithId;

/**
 * 
 * @author ikudimov
 *
 * @param <E>
 *            entity
 * @param <ED>
 *            entityDto
 */
@SuppressWarnings("rawtypes")
public abstract class DtoToCollectionMapper<ED, E extends ObjectWithId> extends CustomMapper<Collection<ED>, Collection> {
    private DomainClassConverter domainClassConverter;

    public DtoToCollectionMapper(DomainClassConverter domainClassConverter) {
        super();
        this.domainClassConverter = domainClassConverter;
    }

    protected abstract Class<E> getEntityClass();

    @Override
    public void mapAtoB(Collection<ED> a, Collection b, MappingContext context) {
        List<E> unwrapedDtoList = new ArrayList<>(a.size());
        mapperFacade.mapAsCollection(a, unwrapedDtoList, getEntityClass());
        CollectionMerger<E> merger = new CollectionMerger<>(mapperFacade, domainClassConverter);
        merger.merge(unwrapedDtoList, b, context);
    }
}
