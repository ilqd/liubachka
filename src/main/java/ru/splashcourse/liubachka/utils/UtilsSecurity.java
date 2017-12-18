package ru.splashcourse.liubachka.utils;

import org.hibernate.ObjectNotFoundException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import ru.splashcourse.liubachka.configs.security.CustomUserDetails;

public class UtilsSecurity {

    private UtilsSecurity() {
    }

    public static CustomUserDetails getUser() throws ObjectNotFoundException {
        final Authentication authentication = SecurityContextHolder.getContext() != null
                ? SecurityContextHolder.getContext().getAuthentication()
                : null;

        final CustomUserDetails userName = authentication != null && authentication.getPrincipal() instanceof CustomUserDetails
                ? ((CustomUserDetails) authentication.getPrincipal())
                : null;

        return userName;
    }
}
