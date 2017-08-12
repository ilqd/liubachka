package ru.splashcourse.liuback;

/**
 * Интерфейс для объектов с id
 *
 * @author ikudimov
 */
public interface ObjectWithId {

    /**
     * Получение id.
     * 
     * @return id
     */
    Long getId();

    /**
     * Установка id
     * 
     * @param id
     *            id
     */
    void setId(Long id);
}
