package ru.splashcourse.liubachka.configs.security.users;

import org.springframework.beans.factory.annotation.Value;

/**
 * UserProjection
 */
public interface UserProjection {

    Long getId();

    String getUsername();

    @Value("#{target.firstName} #{target.lastName}")
    String getFullname();

    boolean isEnabled();

    String getEmail();
}
