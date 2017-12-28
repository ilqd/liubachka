package ru.splashcourse.liubachka.logics.video.model;

import org.springframework.stereotype.Repository;

import ru.splashcourse.liubachka.configs.jpa.CustomJpaRepository;

@Repository
public interface VideoCategoryRepository extends CustomJpaRepository<VideoCategory, Long> {
}
