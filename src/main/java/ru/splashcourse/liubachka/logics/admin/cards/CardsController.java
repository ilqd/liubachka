package ru.splashcourse.liubachka.logics.admin.cards;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import ru.splashcourse.liubachka.logics.admin.cards.model.CardFolderDto;
import ru.splashcourse.liubachka.logics.admin.cards.model.CardItemDto;

@RestController
@RequestMapping(path = "/api/cards")
public class CardsController {

    @Autowired
    private CardsService service;

    @RequestMapping(method = RequestMethod.POST, path = "/folder")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public void createFolder(CardFolderDto dto) {
        service.createFolder(dto);
    }

    @RequestMapping(method = RequestMethod.PATCH, path = "/folder")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public void updateFolder(CardFolderDto dto) {
        service.updateFolder(dto);
    }

    @RequestMapping(method = RequestMethod.DELETE, path = "/folder/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public void deleteFolder(@PathVariable Long id) {
        service.deleteFolder(id);
    }

    @RequestMapping(method = RequestMethod.POST, path = "/item")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public void createCard(CardItemDto dto) {
        service.createCard(dto);
    }

    @RequestMapping(method = RequestMethod.PATCH, path = "/item")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public void updateCard(CardItemDto dto) {
        service.updateCard(dto);
    }

    @RequestMapping(method = RequestMethod.DELETE, path = "/item/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public void deleteCard(@PathVariable Long id) {
        service.deleteCard(id);
    }

    @RequestMapping(method = RequestMethod.GET, path = "/folder")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public List<CardFolderDto> getAll() {
        return service.getAll();
    }

    @RequestMapping(method = RequestMethod.GET, path = "/folder/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public CardFolderDto getFolder(@PathVariable Long id) {
        return service.getFolder(id);
    }

    @RequestMapping(method = RequestMethod.GET, path = "/item/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public CardItemDto getCard(@PathVariable Long id) {
        return service.getCard(id);
    }
}
