package ru.splashcourse.liubachka.configs.security.users;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Table;

import org.apache.commons.lang3.StringUtils;
import org.hibernate.validator.constraints.Email;

// @formatter:off

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import ru.splashcourse.liubachka.ObjectWithId;
import ru.splashcourse.liubachka.configs.role.RoleName;
import ru.splashcourse.liubachka.configs.security.CustomUserDetails;

/**
 * User
 */
@EqualsAndHashCode(of = { "username", "password", "roles", "enabled" })
@ToString(of = { "id", "username" })
@Setter
@Getter
@Entity
@Table(name = "users")
public class User implements ObjectWithId {

	static final int MAX_LENGTH_USERNAME = 30;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false, unique = true, length = MAX_LENGTH_USERNAME)
	private String username;

	@Column(nullable = false)
	private String password;

	private String firstName;

	private String lastName;

	private boolean enabled;

	private LocalDateTime creationTime;

	private LocalDateTime modificationTime;

	@Email
	@Column(name = "email")
	private String email;

	@Getter(lombok.AccessLevel.NONE)
	@Setter(lombok.AccessLevel.NONE)
	private String roles = "";

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
