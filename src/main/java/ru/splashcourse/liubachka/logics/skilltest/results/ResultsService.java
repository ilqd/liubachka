package ru.splashcourse.liubachka.logics.skilltest.results;

import java.util.List;

import ru.splashcourse.liubachka.logics.skilltest.results.model.TestResultDto;

public interface ResultsService {

    Long create(TestResultDto result);

    List<TestResultDto> listAll();

    void update(TestResultDto result);
}
