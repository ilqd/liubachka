package ru.splashcourse.liubachka.logics.skilltest.results.model;

import org.springframework.stereotype.Repository;

import ru.splashcourse.liubachka.configs.jpa.CustomJpaRepository;

@Repository
public interface TestResultRepository extends CustomJpaRepository<TestResult, Long> {

}
