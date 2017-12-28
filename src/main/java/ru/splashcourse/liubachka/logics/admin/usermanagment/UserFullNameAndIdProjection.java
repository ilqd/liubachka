package ru.splashcourse.liubachka.logics.admin.usermanagment;

import org.springframework.beans.factory.annotation.Value;

/**
 * UserProjection
 */
public interface UserFullNameAndIdProjection {

    Long getId();

    @Value("#{target.firstName} #{target.lastName}")
    String getFullname();

}
