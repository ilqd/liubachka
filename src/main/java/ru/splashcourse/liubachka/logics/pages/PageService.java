package ru.splashcourse.liubachka.logics.pages;

import java.util.List;

import ru.splashcourse.liubachka.logics.pages.model.Page;
import ru.splashcourse.liubachka.logics.pages.model.PageDto;

public interface PageService {

    Page createPage(PageDto pageDto);

    Page updatePage(PageDto pageDto);

    void deletePage(Long id);

    void deletePage(String name);

    PageDto getPage(Long id);

    PageDto getPageByName(String name);

    List<PageDto> getAllPages();

    List<String> getAllPageNames();

    PageDto getPageForURL(String url);

    List<PageDto> getAllMappings();
}
