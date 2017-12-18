package ru.splashcourse.liubachka.logics.video.model;

import org.springframework.stereotype.Repository;

import ru.splashcourse.liubachka.configs.jpa.CustomJpaRepository;

@Repository
public interface CommentRepository extends CustomJpaRepository<Comment, Long> {
}
