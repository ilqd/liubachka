package ru.splashcourse.liubachka.logics.pages.model;

import java.util.Optional;

import org.springframework.stereotype.Repository;

import ru.splashcourse.liubachka.configs.jpa.CustomJpaRepository;

@Repository
public interface PageToUrlMappingRepository extends CustomJpaRepository<PageToUrlMapping, Long> {
    Optional<PageToUrlMapping> findByUrl(String url);
}
