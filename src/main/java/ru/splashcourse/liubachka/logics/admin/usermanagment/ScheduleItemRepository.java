package ru.splashcourse.liubachka.logics.admin.usermanagment;

import org.springframework.stereotype.Repository;

import ru.splashcourse.liubachka.configs.jpa.CustomJpaRepository;

/**
 * репозиторий для пользователя
 */
@Repository
public interface ScheduleItemRepository extends CustomJpaRepository<ScheduleItem, Long> {

}
