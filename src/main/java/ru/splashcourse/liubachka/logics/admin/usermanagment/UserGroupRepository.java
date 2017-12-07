package ru.splashcourse.liubachka.logics.admin.usermanagment;

import org.springframework.stereotype.Repository;

import java.util.Optional;

import ru.splashcourse.liubachka.configs.jpa.CustomJpaRepository;

/**
 * репозиторий для пользователя
 */
@Repository
public interface UserGroupRepository extends CustomJpaRepository<UserGroup, Long> {

    Optional<UserGroup> findByName(String name);

}
