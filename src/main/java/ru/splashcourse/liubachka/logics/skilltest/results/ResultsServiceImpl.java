package ru.splashcourse.liubachka.logics.skilltest.results;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ru.splashcourse.liubachka.configs.orika.OrikaBeanMapper;
import ru.splashcourse.liubachka.logics.skilltest.questions.model.SkillTestSystemAssignments;
import ru.splashcourse.liubachka.logics.skilltest.questions.model.SkillTestSystemAssignmentsRepository;
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

    @Autowired
    private SkillTestSystemAssignmentsRepository testAssignRepo;

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
        if (StringUtils.isNotBlank(result.getTestName())) {
            Optional<SkillTestSystemAssignments> testAssignment = testAssignRepo.findByTestTestName(result.getTestName());
            if (testAssignment.isPresent()) {
                result.setTestType(testAssignment.get().getType().toString());
            }
        }
        if (Objects.equals(result.getPersonName(), entity.getPersonName()) && Objects.equals(result.getEmail(), entity.getEmail())
                && Objects.equals(result.getAge(), entity.getAge())) {
            mapper.map(result, entity);
        } else {
            // WTF, impostor!
            repo.save(mapper.map(result, TestResult.class));
        }

    }

}
