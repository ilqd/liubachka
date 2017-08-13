package ru.splashcourse.liubachka.configs.orika;

import java.util.Collection;

import org.hibernate.collection.internal.PersistentBag;

import ma.glasnost.orika.CustomMapper;
import ma.glasnost.orika.MappingContext;
import ru.splashcourse.liubachka.logics.skilltest.questions.model.QuestionDto;

/**
 * маппер для нестед коллекций {@link Question} в {@link QuestionDto}
 * 
 * @author ikudimov
 *
 */
public class AnswerToDtoCollectionMapper extends CustomMapper<PersistentBag, Collection<QuestionDto>> {
    @SuppressWarnings("unchecked")
    @Override
    public void mapAtoB(PersistentBag a, Collection<QuestionDto> b, MappingContext context) {
        a.forEach(elem -> {
            b.add(mapperFacade.map(elem, QuestionDto.class));
        });
    }
}
