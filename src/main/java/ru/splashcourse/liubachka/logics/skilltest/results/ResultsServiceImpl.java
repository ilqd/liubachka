package ru.splashcourse.liubachka.logics.skilltest.results;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ru.splashcourse.liubachka.configs.orika.OrikaBeanMapper;
import ru.splashcourse.liubachka.logics.skilltest.results.model.TestResult;
import ru.splashcourse.liubachka.logics.skilltest.results.model.TestResultDto;
import ru.splashcourse.liubachka.logics.skilltest.results.model.TestResultRepository;

@Service
@Transactional
public class ResultsServiceImpl implements ResultsService {

    @Autowired
    private TestResultRepository repo;

    @Autowired
    private OrikaBeanMapper mapper;

    @Override
    public Long create(TestResultDto result) {
        TestResult entity = repo.save(mapper.map(result, TestResult.class));
        return entity.getId();
    }

    @Override
    public List<TestResultDto> listAll() {
        return mapper.mapAsList(repo.findAll(), TestResultDto.class);
    }

    @Override
    public void update(TestResultDto result) {
        TestResult entity = repo.findOne(result.getId()).get();
        if (result.getPersonName().equals(entity.getPersonName()) && result.getEmail().equals(entity.getEmail())
                && result.getAge().equals(entity.getAge())) {
            mapper.map(result, entity);
        } else {
            // WTF, impostor!
            repo.save(mapper.map(result, TestResult.class));
        }

    }

}
