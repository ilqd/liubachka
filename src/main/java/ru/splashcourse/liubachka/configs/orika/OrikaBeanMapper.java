package ru.splashcourse.liubachka.configs.orika;

import ma.glasnost.orika.Converter;
import ma.glasnost.orika.Mapper;
import ma.glasnost.orika.MapperFactory;
import ma.glasnost.orika.impl.ConfigurableMapper;
import ma.glasnost.orika.impl.DefaultMapperFactory;

import org.springframework.beans.BeansException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.data.repository.support.DomainClassConverter;
import org.springframework.stereotype.Component;

import java.util.Map;

import ru.splashcourse.liubachka.logics.admin.cards.model.CardItem;
import ru.splashcourse.liubachka.logics.admin.cards.model.CardItemDto;
import ru.splashcourse.liubachka.logics.video.model.Comment;
import ru.splashcourse.liubachka.logics.video.model.CommentDto;
import ru.splashcourse.liubachka.logics.video.model.VideoMeta;
import ru.splashcourse.liubachka.logics.video.model.VideoMetaDto;

@Component
public class OrikaBeanMapper extends ConfigurableMapper implements ApplicationContextAware {

    private MapperFactory factory;

    private ApplicationContext applicationContext;

    @Autowired
    private DomainClassConverter domainClassConverter;

    public OrikaBeanMapper() {
        super(false);
    }

    @Override
    protected void configure(final MapperFactory factory) {
        this.factory = factory;
        addAllSpringBeans(applicationContext);
        factory.getConverterFactory().registerConverter(new IdToObjectConverter(domainClassConverter));
        factory.registerMapper(new ObjectWithIdMapper());
        factory.registerMapper(new QuestionDtoCollectionMapper(domainClassConverter));
        factory.registerMapper(new AnswerDtoCollectionMapper(domainClassConverter));
        factory.registerMapper(new QuestionToDtoCollectionMapper());
        factory.registerMapper(new AnswerToDtoCollectionMapper());
        factory.registerMapper(new CommentDtoCollectionMapper(domainClassConverter));
        factory.registerMapper(new CommentToDtoCollectionMapper());
        factory.classMap(Comment.class, CommentDto.class).byDefault().fieldAToB("author.fullName", "authorName").mapNulls(false)
                .mapNullsInReverse(false).register();
        factory.classMap(VideoMeta.class, VideoMetaDto.class).byDefault().fieldAToB("category.name", "categoryName").mapNulls(false)
                .mapNullsInReverse(false).register();
        factory.classMap(CardItemDto.class, CardItem.class).byDefault().exclude("cards").exclude("children").register();
    }

    @Override
    protected void configureFactoryBuilder(final DefaultMapperFactory.Builder factoryBuilder) {
        factoryBuilder.mapNulls(true);
    }

    @SuppressWarnings({"rawtypes", "unchecked"})
    public void addMapper(final Mapper<?, ?> mapper) {
        factory.classMap(mapper.getAType(), mapper.getBType()).byDefault().customize((Mapper) mapper).mapNulls(false)
                .mapNullsInReverse(false).register();
    }

    public void addConverter(final Converter<?, ?> converter) {
        factory.getConverterFactory().registerConverter(converter);
    }

    @SuppressWarnings("rawtypes")
    private void addAllSpringBeans(final ApplicationContext applicationContext) {
        final Map<String, Mapper> mappers = applicationContext.getBeansOfType(Mapper.class);
        for (final Mapper mapper : mappers.values()) {
            addMapper(mapper);
        }
        final Map<String, Converter> converters = applicationContext.getBeansOfType(Converter.class);
        for (final Converter converter : converters.values()) {
            addConverter(converter);
        }
    }

    @Override
    public void setApplicationContext(final ApplicationContext applicationContext) throws BeansException {
        this.applicationContext = applicationContext;
        init();
    }

}