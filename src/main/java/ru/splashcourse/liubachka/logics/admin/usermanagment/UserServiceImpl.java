package ru.splashcourse.liubachka.logics.admin.usermanagment;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import ru.splashcourse.liubachka.configs.orika.OrikaBeanMapper;
import ru.splashcourse.liubachka.configs.security.SecurityConfig;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository repo;

    @Autowired
    private UserGroupRepository groupRepo;

    @Autowired
    private OrikaBeanMapper mapper;

    private PasswordEncoder passwordEncoder = SecurityConfig.passwordEncoder();

    @Override
    public List<UserProjection> findAll() {
        return repo.findByUsernameNotNull().stream().sorted((a, b) -> a.getFullname().compareToIgnoreCase(b.getFullname()))
                .collect(Collectors.toList());
    }

    @Override
    public UserDto findById(Long id) {
        UserDto result = new UserDto();
        mapper.map(repo.findById(id), result);
        result.setPassword(null);
        return result;
    }

    @Override
    public void create(UserDto dto) {
        if (StringUtils.isBlank(dto.getPassword())) {
            throw new PasswordException("Passoword can not be empty");
        }
        dto.setPassword(passwordEncoder.encode(dto.getPassword()));
        User user = new User();
        mapper.map(dto, user);
        repo.save(user);
    }

    @Override
    public void update(UserDto dto) {
        User user = repo.getOne(dto.getId());
        if (StringUtils.isNoneBlank(dto.getPassword())) {
            dto.setPassword(passwordEncoder.encode(dto.getPassword()));
        } else {
            dto.setPassword(user.getPassword());
        }
        mapper.map(dto, user);
    }

    @Override
    public UserGroupDto findGroupById(Long id) {
        return mapper.map(groupRepo.findOne(id), UserGroupDto.class);
    }

    @Override
    public void createGroup(UserGroupDto dto) {
        groupRepo.save(mapper.map(dto, UserGroup.class));
    }

    @Override
    public void updateGroup(UserGroupDto dto) {
        UserGroup group = groupRepo.findOne(dto.getId()).get();
        mapper.map(dto, group);
    }

    @Override
    public List<UserGroupDto> findAllGroups() {
        List<UserGroup> groups = groupRepo.findAll();
        List<UserGroupDto> result = new ArrayList<>();
        mapper.mapAsCollection(groups, result, UserGroupDto.class);
        return result;
    }

    @Override
    public List<UserFullNameAndIdProjection> findAllFullnames() {
        // TODO Auto-generated method stub
        return repo.findByFirstNameNotNull();
    }

}
