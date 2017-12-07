package ru.splashcourse.liubachka.logics.admin.usermanagment;

import java.util.List;

public interface UserService {

    List<UserProjection> findAll();

    UserDto findById(Long id);

    void create(UserDto dto);

    void update(UserDto dto);

    List<UserGroupDto> findAllGroups();

    UserGroupDto findGroupById(Long id);

    void createGroup(UserGroupDto dto);

    void updateGroup(UserGroupDto dto);

}
