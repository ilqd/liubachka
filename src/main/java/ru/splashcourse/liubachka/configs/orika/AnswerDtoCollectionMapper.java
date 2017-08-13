package ru.splashcourse.liubachka.configs.orika;

import java.util.Collection;

import org.springframework.data.repository.support.DomainClassConverter;

import ma.glasnost.orika.metadata.Type;
import ma.glasnost.orika.metadata.TypeBuilder;
import ru.splashcourse.liubachka.logics.skilltest.questions.model.Answer;
import ru.splashcourse.liubachka.logics.skilltest.questions.model.AnswerDto;

/**
 * Маппер для {@link AnswerDto}
 * 
 * @author ikudimov
 *
 */
public class AnswerDtoCollectionMapper extends DtoToCollectionMapper<AnswerDto, Answer> {

    @Override
    public Type<Collection<AnswerDto>> getAType() {
        TypeBuilder builder = new TypeBuilder<Collection<AnswerDto>>() {
        };
        return builder.build();
    }

    @Override
    public Type<Collection> getBType() {
        TypeBuilder builder = new TypeBuilder<Collection<Answer>>() {
        };
        return builder.build();
    }

    public AnswerDtoCollectionMapper(DomainClassConverter domainClassConverter) {
        super(domainClassConverter);
    }

    @Override
    protected Class<Answer> getEntityClass() {
        return Answer.class;
    }

}
