package ru.splashcourse.liubachka.logics.admin.cards.model;

import org.springframework.stereotype.Repository;

import ru.splashcourse.liubachka.configs.jpa.CustomJpaRepository;

@Repository
public interface CardFolderRepository extends CustomJpaRepository<CardFolder, Long> {
}
