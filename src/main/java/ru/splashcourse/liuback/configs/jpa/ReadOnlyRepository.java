package ru.splashcourse.liuback.configs.jpa;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.data.repository.Repository;

import java.io.Serializable;
import java.util.List;

/**
 * Репозиторий только для чтения
 *
 * @param <T> type
 * @param <ID> Serializable type
 */
@NoRepositoryBean
public interface ReadOnlyRepository<T, ID extends Serializable> extends
        Repository<T, ID> {

    /**
     * Retrieves an entity by its id.
     *
     * @param id
     *            - must not be null.
     * @return the entity with the given id or null if none found.
     */
    T findOne(ID id);

    /**
     * Returns all instances of the type.
     *
     * @return all found entities
     */
    List<T> findAll();

    /**
     * Returns all instances of the type sorted by the type.
     *
     * @param sort
     *            {@link Sort} object applied to the returned elements list.
     * @return sorted list
     */
    List<T> findAll(Sort sort);

    /**
     * Returns a Page of entities meeting the paging restriction provided in the Pageable object.
     *
     * @param pageable
     *            object for pagination information.
     * @return A Page of entities.
     */
    Page<T> findAll(Pageable pageable);

}
