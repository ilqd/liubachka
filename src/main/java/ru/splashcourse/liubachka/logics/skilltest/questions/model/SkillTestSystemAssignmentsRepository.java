package ru.splashcourse.liubachka.logics.skilltest.questions.model;

import java.util.Optional;

import org.springframework.stereotype.Repository;

import ru.splashcourse.liubachka.configs.jpa.CustomJpaRepository;

@Repository
public interface SkillTestSystemAssignmentsRepository extends CustomJpaRepository<SkillTestSystemAssignments, Long> {

    Optional<SkillTestSystemAssignments> findByType(SkillTestSystemTypes type);

    Optional<SkillTestSystemAssignments> findByTestTestName(String testName);
}
