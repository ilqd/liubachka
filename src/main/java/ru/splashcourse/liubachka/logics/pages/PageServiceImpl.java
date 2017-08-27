package ru.splashcourse.liubachka.logics.pages;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ru.splashcourse.liubachka.configs.orika.OrikaBeanMapper;
import ru.splashcourse.liubachka.logics.pages.model.Page;
import ru.splashcourse.liubachka.logics.pages.model.PageDto;
import ru.splashcourse.liubachka.logics.pages.model.PageRepository;
import ru.splashcourse.liubachka.logics.pages.model.PageToUrlMapping;
import ru.splashcourse.liubachka.logics.pages.model.PageToUrlMappingRepository;

@Service
@Transactional
public class PageServiceImpl implements PageService {

    @Autowired
    private PageRepository repo;

    @Autowired
    private PageToUrlMappingRepository pageToUrlRepo;

    @Autowired
    private OrikaBeanMapper mapper;

    @Override
    public void createPage(String name) {
        Page page = new Page();
        page.setName(name);
        repo.save(page);
    }

    @Override
    public void updatePage(PageDto pageDto) {
        Optional<Page> page = repo.findOne(pageDto.getId());
        mapper.map(pageDto, page.get());
    }

    @Override
    public void deletePage(Long id) {
        repo.findOne(id).get().setHidden(true);
    }

    @Override
    public void deletePage(String name) {
        repo.findByName(name).get().setHidden(true);
    }

    @Override
    public PageDto getPage(Long id) {
        return mapper.map(repo.findOne(id), PageDto.class);
    }

    @Override
    public PageDto getPageByName(String name) {
        return mapper.map(repo.findByName(name), PageDto.class);
    }

    @Override
    public List<PageDto> getAllPages() {
        List<PageDto> result = new ArrayList<>();
        mapper.mapAsCollection(repo.findAll(), result, PageDto.class);
        return result;
    }

    @Override
    public List<String> getAllPageNames() {
        return repo.findAll().stream().map(p -> p.getName()).collect(Collectors.toList());
    }

    @Override
    public PageDto getPageForURL(String url) {
        return mapper.map(pageToUrlRepo.findByUrl(url), PageDto.class);
    }

    @Override
    public void setPageForUrl(String url, Long pageId) {
        Optional<PageToUrlMapping> present = pageToUrlRepo.findByUrl(url);
        Optional<Page> page = repo.findOne(pageId);
        if (present.isPresent()) {
            present.get().setPage(page.get());
        } else {
            PageToUrlMapping newMapping = new PageToUrlMapping();
            newMapping.setPage(page.get());
            newMapping.setUrl(url);
            pageToUrlRepo.save(newMapping);
        }
    }

    @Override
    public Map<String, String> getAllMappings() {
        List<PageToUrlMapping> allMappings = pageToUrlRepo.findAll();
        Map<String, String> result = new HashMap<>();
        allMappings.forEach(mapping -> {
            result.put(mapping.getUrl(), mapping.getPage().getName());
        });
        return result;
    }

}
