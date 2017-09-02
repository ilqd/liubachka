package ru.splashcourse.liubachka.logics.pages;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ru.splashcourse.liubachka.configs.orika.OrikaBeanMapper;
import ru.splashcourse.liubachka.logics.pages.model.Page;
import ru.splashcourse.liubachka.logics.pages.model.PageDto;
import ru.splashcourse.liubachka.logics.pages.model.PageRepository;

@Service
@Transactional
public class PageServiceImpl implements PageService {

    @Autowired
    private PageRepository repo;

    @Autowired
    private OrikaBeanMapper mapper;

    @Override
    public Page createPage(PageDto pageDto) {
        Page page = new Page();
        mapper.map(pageDto, page);
        return repo.save(page);
    }

    @Override
    public Page updatePage(PageDto pageDto) {
        Page page = repo.findOne(pageDto.getId()).get();
        mapper.map(pageDto, page);
        return page;
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
        result.forEach(p -> p.setChildren(new ArrayList<>()));
        return result;
    }

    @Override
    public List<String> getAllPageNames() {
        return repo.findAll().stream().map(p -> p.getName()).collect(Collectors.toList());
    }

    @Override
    public PageDto getPageForURL(String url) {
        return mapper.map(repo.findByUrl(url), PageDto.class);
    }

    @Override
    public List<PageDto> getAllMappings() {
        List<PageDto> result = new ArrayList<>();
        mapper.mapAsCollection(repo.findByUrlNotNull(), result, PageDto.class);
        return result;
    }

}
