package ru.splashcourse.liubachka.logics.pages.model;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Repository;

import ru.splashcourse.liubachka.configs.jpa.CustomJpaRepository;

@Repository
public interface PageRepository extends CustomJpaRepository<Page, Long> {
    Optional<Page> findByName(String name);

    Optional<Page> findByUrl(String url);

    List<Page> findByUrlNotNull();
}
