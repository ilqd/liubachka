package ru.splashcourse.liubachka.configs.orika;

import java.util.Collection;

import org.hibernate.collection.internal.PersistentBag;

import ma.glasnost.orika.CustomMapper;
import ma.glasnost.orika.MappingContext;
import ru.splashcourse.liubachka.logics.skilltest.questions.model.AnswerDto;

/**
 * маппер для нестед коллекций {@link Answer} в {@link AnswerDto}
 * 
 * @author ikudimov
 *
 */
public class QuestionToDtoCollectionMapper extends CustomMapper<PersistentBag, Collection<AnswerDto>> {
    @SuppressWarnings("unchecked")
    @Override
    public void mapAtoB(PersistentBag a, Collection<AnswerDto> b, MappingContext context) {
        a.forEach(elem -> {
            b.add(mapperFacade.map(elem, AnswerDto.class));
        });
    }
}
