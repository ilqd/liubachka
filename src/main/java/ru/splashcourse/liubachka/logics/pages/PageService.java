package ru.splashcourse.liubachka.logics.pages;

import java.util.List;
import java.util.Map;

import ru.splashcourse.liubachka.logics.pages.model.PageDto;

public interface PageService {

    void createPage(String name);

    void updatePage(PageDto pageDto);

    void deletePage(Long id);

    void deletePage(String name);

    PageDto getPage(Long id);

    PageDto getPageByName(String name);

    List<PageDto> getAllPages();

    List<String> getAllPageNames();

    PageDto getPageForURL(String url);

    Map<String, String> getAllMappings();

    void setPageForUrl(String url, Long pageId);
}
