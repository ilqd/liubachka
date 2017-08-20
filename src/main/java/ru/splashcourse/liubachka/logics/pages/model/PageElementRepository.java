package ru.splashcourse.liubachka.logics.pages.model;

import java.util.Optional;

import org.springframework.stereotype.Repository;

import ru.splashcourse.liubachka.configs.jpa.CustomJpaRepository;

@Repository
public interface PageElementRepository extends CustomJpaRepository<PageElement, Long> {
    Optional<PageElement> findByName(String name);
}
