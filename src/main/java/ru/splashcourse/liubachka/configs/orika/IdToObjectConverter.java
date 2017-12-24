package ru.splashcourse.liubachka.configs.orika;

import ma.glasnost.orika.MappingContext;
import ma.glasnost.orika.converter.BidirectionalConverter;
import ma.glasnost.orika.metadata.Type;

import org.springframework.core.convert.TypeDescriptor;
import org.springframework.data.repository.support.DomainClassConverter;

import java.util.Optional;

import ru.splashcourse.liubachka.ObjectWithId;

public class IdToObjectConverter<T extends ObjectWithId> extends BidirectionalConverter<Long, T> {

    private DomainClassConverter domainClassConverter;

    public IdToObjectConverter(DomainClassConverter domainClassConverter) {
        super();
        this.domainClassConverter = domainClassConverter;
    }

    @Override
    public boolean canConvert(Type<?> sourceType, Type<?> destinationType) {
        return (this.sourceType.isAssignableFrom(sourceType) && this.destinationType.isAssignableFrom(destinationType))
                || (this.destinationType.isAssignableFrom(sourceType) && this.sourceType.isAssignableFrom(destinationType));
    }

    @Override
    public Long convertFrom(T arg0, Type<Long> arg1, MappingContext arg2) {
        return arg0.getId();
    }

    @Override
    public T convertTo(Long arg0, Type<T> arg1, MappingContext arg2) {
        Optional<T> opt = (Optional<T>) domainClassConverter.convert(arg0, TypeDescriptor.valueOf(Long.class),
                TypeDescriptor.valueOf(arg1.getRawType()));
        return opt.get();
    }
}
