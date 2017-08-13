package ru.splashcourse.liubachka.configs.orika;

import org.springframework.beans.BeanUtils;

import ma.glasnost.orika.CustomMapper;
import ma.glasnost.orika.MappingContext;
import ru.splashcourse.liubachka.ObjectWithId;

/**
 * ObjectWithIdMapper
 * 
 * @param <T>
 *            ObjectWithId
 */
public class ObjectWithIdMapper<T extends ObjectWithId> extends CustomMapper<T, T> {

    @Override
    public void mapAtoB(T a, T b, MappingContext context) {
        if (a.getId().equals(b.getId())) {
            BeanUtils.copyProperties(a, b);
        } else {
            b = a;
        }
    }

    @Override
    public void mapBtoA(T b, T a, MappingContext context) {
        if (a.getId().equals(b.getId())) {
            BeanUtils.copyProperties(b, a);
        } else {
            a = b;
        }
    }
}
