package ru.splashcourse.liuback.logics.skilltest.questions.model;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Repository;

import ru.splashcourse.liuback.configs.jpa.CustomJpaRepository;

@Repository
public interface SkillTestRepository extends CustomJpaRepository<SkillTest, Long> {

	Optional<SkillTest> findByTestNameAndVersion(String testName, Long version);

	Optional<SkillTest> findLastByTestNameOrderByVersionDesc(String testName);

	List<SkillTest> findByTestName(String testName);

}
