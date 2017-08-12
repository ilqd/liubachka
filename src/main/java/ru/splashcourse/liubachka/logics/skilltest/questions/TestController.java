package ru.splashcourse.liubachka.logics.skilltest.questions;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import ru.splashcourse.liubachka.logics.skilltest.questions.model.SkillTestDto;

@RestController
@RequestMapping(value = "/tests")
public class TestController {

	@Autowired
	private TestService service;

	@RequestMapping(value = "/last/{testName}")
	public SkillTestDto findLastByTestName(@PathVariable String testName) {
		return service.findLatestByName(testName);
	}

	@RequestMapping(value = "/specific/{testName}/{version}")
	public SkillTestDto findLastByTestNameAndVersion(@PathVariable String testName, @PathVariable Long version) {
		return service.findByTestNameAndVersion(testName, version);
	}

	@RequestMapping(value = "/list")
	public Set<String> showTests() {
		return service.getAvailableTestsByName();
	}

	@RequestMapping(value = "/create", method = RequestMethod.POST)
	public void create(@RequestBody SkillTestDto test) {
		service.create(test);
	}

	@RequestMapping(value = "/update", method = RequestMethod.PUT)
	public void update(@RequestBody SkillTestDto test) {
		service.update(test);
	}

	@RequestMapping(value = "/updateWithoutVersioning", method = RequestMethod.PATCH)
	public void updateWithoutVersioning(@RequestBody SkillTestDto test) {
		service.updateWithoutVersioning(test);
	}

}
