package ru.splashcourse.liubachka.configs.security.users;

import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

import ru.splashcourse.liubachka.configs.jpa.CustomJpaRepository;

/**
 * репозиторий для пользователя
 */
@Repository
public interface UserRepository extends CustomJpaRepository<User, Long> {

    /**
     * Поиск по имени
     * 
     * @param username
     *            имя
     * @return {@link Optional} для пользователя
     */
    Optional<User> findByUsername(String username);

    /**
     * Поиск по наличию роли.
     *
     * @param roles
     *            роль
     * @return список пользователей.
     */
    List<User> findByRolesContaining(String roles);

    List<UserProjection> findByUsernameNotNull();

    User findById(Long id);
}
