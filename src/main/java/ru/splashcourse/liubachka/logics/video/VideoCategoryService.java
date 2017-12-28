package ru.splashcourse.liubachka.logics.video;

import java.util.List;

import ru.splashcourse.liubachka.logics.video.model.VideoCategoryDto;

public interface VideoCategoryService {

    void create(VideoCategoryDto dto);

    void update(VideoCategoryDto dto);

    void delete(Long id);

    void restore(Long id);

    List<VideoCategoryDto> getAll();

    VideoCategoryDto getOne(Long id);

}
