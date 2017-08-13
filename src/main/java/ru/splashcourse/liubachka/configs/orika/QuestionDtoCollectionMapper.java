package ru.splashcourse.liubachka.configs.orika;

import java.util.Collection;

import org.springframework.data.repository.support.DomainClassConverter;

import ma.glasnost.orika.metadata.Type;
import ma.glasnost.orika.metadata.TypeBuilder;
import ru.splashcourse.liubachka.logics.skilltest.questions.model.Question;
import ru.splashcourse.liubachka.logics.skilltest.questions.model.QuestionDto;

/**
 * Маппер для {@link QuestionDto}
 * 
 * @author ikudimov
 *
 */
public class QuestionDtoCollectionMapper extends DtoToCollectionMapper<QuestionDto, Question> {

    @Override
    public Type<Collection<QuestionDto>> getAType() {
        TypeBuilder builder = new TypeBuilder<Collection<QuestionDto>>() {
        };
        return builder.build();
    }

    @Override
    public Type<Collection> getBType() {
        TypeBuilder builder = new TypeBuilder<Collection<Question>>() {
        };
        return builder.build();
    }

    public QuestionDtoCollectionMapper(DomainClassConverter domainClassConverter) {
        super(domainClassConverter);
    }

    @Override
    protected Class<Question> getEntityClass() {
        return Question.class;
    }

}
