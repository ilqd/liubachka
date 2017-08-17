package ru.splashcourse.liubachka.logics.skilltest.results;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import ru.splashcourse.liubachka.logics.skilltest.results.model.TestResultDto;

@RestController
@RequestMapping(value = "/api/results")
public class ResultController {
    @Autowired
    private ResultsService service;

    @RequestMapping(value = "/start", method = RequestMethod.POST)
    public Long startTest(@RequestBody TestResultDto dto) {
        return service.create(dto);
    }

    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public void updateTestResults(@RequestBody TestResultDto dto) {
        service.update(dto);
    }

    @RequestMapping(value = "/listResults")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public List<TestResultDto> listTestResults() {
        return service.listAll();
    }
}
