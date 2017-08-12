package ru.splashcourse.liubachka.logics.skilltest.questions;

import java.util.List;
import java.util.Set;

import ru.splashcourse.liubachka.logics.skilltest.questions.model.SkillTestDto;

public interface TestService {

	List<SkillTestDto> findAll();

	SkillTestDto findOne(Long id);

	SkillTestDto findLatestByName(String testName);

	SkillTestDto findByTestNameAndVersion(String testName, Long version);

	Set<String> getAvailableTestsByName();

	void update(SkillTestDto test);

	void updateWithoutVersioning(SkillTestDto test);

	void create(SkillTestDto test);

	void delete(Long id);

	void deleteAllTestsByName(String testName);

	void restore(Long id);

}
