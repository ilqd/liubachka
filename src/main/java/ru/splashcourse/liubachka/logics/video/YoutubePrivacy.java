package ru.splashcourse.liubachka.logics.video;

import lombok.Getter;

public enum YoutubePrivacy {

    PUBLIC("public"), UNLISTED("unlisted"), PRIVATE("private.");

    @Getter
    private String name;

    private YoutubePrivacy(String name) {
        this.name = name;
    }

}
