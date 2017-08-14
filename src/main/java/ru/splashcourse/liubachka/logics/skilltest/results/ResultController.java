package ru.splashcourse.liubachka.logics.skilltest.results;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ru.splashcourse.liubachka.logics.skilltest.results.model.TestResultDto;

@RestController
@RequestMapping(value = "/api/results")
public class ResultController {
    @Autowired
    private ResultsService service;

    @RequestMapping(value = "/start")
    public Long startTest(TestResultDto dto) {
        return service.create(dto);
    }

    @RequestMapping(value = "/update")
    public void updateTestResults(TestResultDto dto) {
        service.update(dto);
    }

    @RequestMapping(value = "/listResults")
    public List<TestResultDto> updateTestResults() {
        return service.listAll();
    }
}
