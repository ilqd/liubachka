package ru.splashcourse.liubachka.logics.admin.cards;

import java.util.List;

import ru.splashcourse.liubachka.logics.admin.cards.model.CardFolderDto;
import ru.splashcourse.liubachka.logics.admin.cards.model.CardItemDto;

public interface CardsService {

    void createFolder(CardFolderDto dto);

    void updateFolder(CardFolderDto dto);

    void deleteFolder(Long id);

    void createCard(CardItemDto dto);

    void updateCard(CardItemDto dto);

    void deleteCard(Long id);

    List<CardFolderDto> getAll();

    CardFolderDto getFolder(Long id);

    CardItemDto getCard(Long id);
}
