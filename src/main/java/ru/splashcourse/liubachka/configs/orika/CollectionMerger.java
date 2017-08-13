package ru.splashcourse.liubachka.configs.orika;

import java.util.Collection;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Optional;
import java.util.Set;

import org.springframework.core.convert.TypeDescriptor;
import org.springframework.data.repository.support.DomainClassConverter;

import ma.glasnost.orika.MapperFacade;
import ma.glasnost.orika.MappingContext;
import ru.splashcourse.liubachka.ObjectWithId;

/**
 * Объединятель коллекций
 * 
 * @param <T>
 *            тип объекта БД
 */
public class CollectionMerger<T extends ObjectWithId> {

    private MapperFacade mapperFacade;

    private DomainClassConverter domainClassConverter;

    /**
     * Конструктор
     * 
     * @param mapperFacade
     *            mapperFacade
     * @param domainClassConverter
     *            domainClassConverter
     */
    public CollectionMerger(MapperFacade mapperFacade, DomainClassConverter domainClassConverter) {
        this.mapperFacade = mapperFacade;
        this.domainClassConverter = domainClassConverter;
    }

    /**
     * слияние
     * 
     * @param newCollection
     *            новая коллекция
     * @param destinationCollection
     *            коллекция назначения
     * @param context
     *            контекст
     * @return объекдиненная коллекция
     */
    @SuppressWarnings({"unchecked", "rawtypes"})
    public Collection merge(Collection<T> newCollection, Collection destinationCollection, MappingContext context) {
        Set<Long> ids = new HashSet<>(newCollection.size());

        for (T entity : newCollection) {
            if (entity.getId() == null) {
                destinationCollection.add(entity);
            } else {
                Optional<ObjectWithId> memberEntity = destinationCollection.stream()
                        .filter(obj -> ((ObjectWithId) obj).getId().equals(entity.getId())).findFirst();
                if (memberEntity.isPresent()) {
                    mapperFacade.map(entity, memberEntity.get());
                } else {
                    Optional<T> attachedEntity = (Optional<T>) domainClassConverter.convert(entity.getId(),
                            TypeDescriptor.valueOf(Long.class), TypeDescriptor.forObject(entity));
                    mapperFacade.map(entity, attachedEntity.get());
                    destinationCollection.add(attachedEntity.get());
                }
                ids.add(entity.getId());
            }
        }

        for (Iterator<ObjectWithId> iterator = destinationCollection.iterator(); iterator.hasNext();) {
            ObjectWithId dstEntity = iterator.next();
            if (dstEntity.getId() != null && !ids.contains(dstEntity.getId())) {
                iterator.remove();
            }
        }

        return destinationCollection;
    }
}
