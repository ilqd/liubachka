package ru.splashcourse.liubachka.logics.skilltest.questions.model;

import org.springframework.stereotype.Repository;

import ru.splashcourse.liubachka.configs.jpa.CustomJpaRepository;

@Repository
public interface QuestionRepository extends CustomJpaRepository<Question, Long> {
}
