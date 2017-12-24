package ru.splashcourse.liubachka.logics.admin.usermanagment;

// @formatter:off

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import org.apache.commons.lang3.StringUtils;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.hibernate.annotations.Formula;
import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotBlank;
import org.springframework.util.CollectionUtils;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Table;

import ru.splashcourse.liubachka.ObjectWithId;
import ru.splashcourse.liubachka.configs.role.RoleName;
import ru.splashcourse.liubachka.configs.security.CustomUserDetails;

/**
 * User
 */
@EqualsAndHashCode(of = { "username", "password", "roles", "enabled" })
@Setter
@Getter
@Entity
@Table(name = "users")
public class User implements ObjectWithId {

	@Override
    public String toString() {
        return firstName + " " + lastName;
    }

    static final int MAX_LENGTH_USERNAME = 30;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false, unique = true, length = MAX_LENGTH_USERNAME)
    @NotBlank
	private String username;
	
    @NotBlank
	private String password;

    @NotBlank
	private String firstName;
      
    @NotBlank
	private String lastName;
    
    @Formula("concat(first_name,' ',last_name)")
    private String fullName;

	private boolean enabled=true;

	private LocalDateTime creationTime;

	private LocalDateTime modificationTime;

	@Email
	@Column(name = "email")
	private String email;

	@Getter(lombok.AccessLevel.NONE)
	@Setter(lombok.AccessLevel.NONE)
	private String roles = "";
	
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name="student_schedule_items", joinColumns=@JoinColumn(name="user_id"), inverseJoinColumns=@JoinColumn(name="schedule_item_id"))  
    @Fetch(FetchMode.SUBSELECT)
	private List<ScheduleItem> sheduleItemsAsStudent;
    
    @OneToMany(mappedBy = "teacher", cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REMOVE}, fetch = FetchType.EAGER)
    @Fetch(FetchMode.SUBSELECT)
    private List<ScheduleItem> sheduleItemsAsTeacher;
    
    public void setSheduleItemsAsTeacher(List<ScheduleItem> sheduleItemsAsTeacher) {
        if (!CollectionUtils.isEmpty(sheduleItemsAsTeacher)) {
            sheduleItemsAsTeacher.forEach(q -> q.setTeacher(this));
        }
        this.sheduleItemsAsTeacher = sheduleItemsAsTeacher;
    }

	/**
	 * User
	 */
	public User() {
	}

	/**
	 * Constructor used exclusively by {@link CustomUserDetails}}
	 *
	 * @param user
	 *            user
	 */
	public User(final User user) {
		this.id = user.id;
		this.username = user.username;
		this.password = user.password;
		this.enabled = user.enabled;
		this.firstName = user.firstName;
		this.lastName = user.lastName;
		this.roles = user.roles;
		this.email = user.email;
		this.sheduleItemsAsStudent = user.sheduleItemsAsStudent;
		this.sheduleItemsAsTeacher = user.sheduleItemsAsTeacher;
	}

	/**
	 * prePersist
	 */
	@PrePersist
	public void prePersist() {
		creationTime = LocalDateTime.now();
	}

	/**
	 * preUpdate
	 */
	@PreUpdate
	public void preUpdate() {
		modificationTime = LocalDateTime.now();
	}

	/**
	 * getRoles
	 *
	 * @return getRoles
	 */
	public Set<RoleName> getRoles() {
		Set<RoleName> res = new HashSet<>();
		for (String authority : getRolesStringColl()) {
			res.add(RoleName.valueOf(authority));
		}
		return res;
	}

	public Collection<String> getRolesStringColl() {
		return StringUtils.isBlank(roles) ? Collections.emptySet() : Arrays.asList(StringUtils.split(roles, ','));
	}

	public void setRoles(Set<RoleName> roles) {
		this.roles = collectionToString(roles);
	}

	private String collectionToString(Collection<?> rolesCol) {
		return rolesCol == null || rolesCol.isEmpty() ? "" : StringUtils.join(rolesCol, ',');
	}
}
