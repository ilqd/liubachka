package ru.splashcourse.liubachka.logics.skilltest.questions;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ru.splashcourse.liubachka.configs.orika.OrikaBeanMapper;
import ru.splashcourse.liubachka.logics.skilltest.questions.model.SkillTest;
import ru.splashcourse.liubachka.logics.skilltest.questions.model.SkillTestDto;
import ru.splashcourse.liubachka.logics.skilltest.questions.model.SkillTestRepository;
import ru.splashcourse.liubachka.logics.skilltest.questions.model.SkillTestSystemAssignments;
import ru.splashcourse.liubachka.logics.skilltest.questions.model.SkillTestSystemAssignmentsRepository;
import ru.splashcourse.liubachka.logics.skilltest.questions.model.SkillTestSystemTypes;

@Service
@Transactional
public class TestServiceImpl implements TestService {

    @Autowired
    private SkillTestRepository repo;

    @Autowired
    private SkillTestSystemAssignmentsRepository assigmentRepo;

    @Autowired
    protected OrikaBeanMapper mapper;

    @Override
    public List<SkillTestDto> findAll() {
        return mapper.mapAsList(repo.findAll(), SkillTestDto.class);
    }

    @Override
    public SkillTestDto findOne(Long id) {
        Optional<SkillTest> test = repo.findOne(id);
        if (!test.isPresent()) {
            throw new EntityNotFoundException();
        }
        return mapper.map(test.get(), SkillTestDto.class);
    }

    @Override
    public SkillTestDto findLatestByName(String testName) {
        Optional<SkillTest> test = repo.findLastByTestNameOrderByVersionDesc(testName);
        if (!test.isPresent()) {
            throw new EntityNotFoundException();
        }
        return mapper.map(test.get(), SkillTestDto.class);
    }

    @Override
    public SkillTestDto findByTestNameAndVersion(String testName, Long version) {
        Optional<SkillTest> test = repo.findByTestNameAndVersion(testName, version);
        if (!test.isPresent()) {
            throw new EntityNotFoundException();
        }
        return mapper.map(test.get(), SkillTestDto.class);
    }

    @Override
    public void update(SkillTestDto test) {
        SkillTest oldTest = repo.findOne(test.getId()).get();
        if (!oldTest.getTestName().equals(test.getTestName())) {
            List<SkillTest> oldVersions = repo.findByTestName(oldTest.getTestName());
            oldVersions.stream().forEach(t -> t.setTestName(test.getTestName()));
        }
        test.setVersion(test.getVersion() + 1);
        test.setId(null);
        repo.save(mapper.map(test, SkillTest.class));

    }

    @Override
    public void updateWithoutVersioning(SkillTestDto test) {
        SkillTest oldTest = repo.findOne(test.getId()).get();
        mapper.map(test, oldTest);
    }

    @Override
    public void create(SkillTestDto test) {
        test.setVersion(1L);
        test.setId(null);
        SkillTest testEntity = mapper.map(test, SkillTest.class);
        repo.save(testEntity);
    }

    @Override
    public void delete(Long id) {
        repo.findOne(id).get().setHidden(true);
    }

    @Override
    public void restore(Long id) {
        repo.findOne(id).get().setHidden(false);
    }

    @Override
    public Set<String> getAvailableTestsByName() {
        List<SkillTest> result = new ArrayList<>();
        result.addAll(repo.findAll());
        Set<String> testNames = result.stream().map(r -> r.getTestName()).collect(Collectors.toSet());
        return testNames;
    }

    @Override
    public void deleteAllTestsByName(String testName) {
        List<SkillTest> oldVersions = repo.findByTestName(testName);
        oldVersions.stream().forEach(t -> t.setHidden(true));
    }

    @Override
    public void setSystemAssignment(SkillTestSystemTypes type, String testName) {
        Optional<SkillTestSystemAssignments> assignment = assigmentRepo.findByType(type);
        Optional<SkillTest> test = repo.findLastByTestNameOrderByVersionDesc(testName);
        if (assignment.isPresent()) {
            assignment.get().setTest(test.get());
        } else {
            SkillTestSystemAssignments newAssign = new SkillTestSystemAssignments(type, test.get());
            assigmentRepo.save(newAssign);
        }
    }

    @Override
    public SkillTestDto getSystemAssignment(SkillTestSystemTypes type) {
        SkillTestSystemAssignments assignment = assigmentRepo.findByType(type).get();
        return mapper.map(repo.findOne(assignment.getTest().getId()).get(), SkillTestDto.class);
    }

}
