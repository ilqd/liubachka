package ru.splashcourse.liubachka.logics.video;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

import ru.splashcourse.liubachka.configs.orika.OrikaBeanMapper;
import ru.splashcourse.liubachka.logics.video.model.VideoCategory;
import ru.splashcourse.liubachka.logics.video.model.VideoCategoryDto;
import ru.splashcourse.liubachka.logics.video.model.VideoCategoryRepository;

@Service
@Transactional
public class VideoCategoryServiceImpl implements VideoCategoryService {

    @Autowired
    private VideoCategoryRepository repo;

    @Autowired
    private OrikaBeanMapper mapper;

    @Override
    public void create(VideoCategoryDto dto) {
        repo.save(mapper.map(dto, VideoCategory.class));
    }

    @Override
    public void update(VideoCategoryDto dto) {
        mapper.map(dto, repo.findOne(dto.getId()).get());
    }

    @Override
    public void delete(Long id) {
        VideoCategory cat = repo.findOne(id).get();
        cat.setHidden(true);
    }

    @Override
    public void restore(Long id) {
        VideoCategory cat = repo.findOne(id).get();
        cat.setHidden(false);
    }

    @Override
    public List<VideoCategoryDto> getAll() {
        List<VideoCategoryDto> result = new ArrayList<>();
        mapper.mapAsCollection(repo.findAll(), result, VideoCategoryDto.class);
        return result;
    }

    @Override
    public VideoCategoryDto getOne(Long id) {
        return mapper.map(repo.findOne(id).get(), VideoCategoryDto.class);
    }

}
