package ru.splashcourse.liubachka.logics.video.model;

import org.springframework.stereotype.Repository;

import java.util.List;

import ru.splashcourse.liubachka.configs.jpa.CustomJpaRepository;

@Repository
public interface CommentRepository extends CustomJpaRepository<Comment, Long> {

    List<Comment> findByVideoIdOrderByIdDesc(Long id);
}
