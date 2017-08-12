package ru.splashcourse.liuback.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.SecurityAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import ru.splashcourse.liuback.role.RoleName;

@EnableWebSecurity
@Import({ SecurityAutoConfiguration.class })
@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	@Override
	protected void configure(final HttpSecurity http) throws Exception {
		// @formatter:off
		http.authorizeRequests().antMatchers("/", "/*", "/**").permitAll().antMatchers("/manage", "/manage/**")
				.hasAuthority(RoleName.ROLE_ADMIN.toString()).and().formLogin().loginPage("/").permitAll().and()
				.logout().permitAll();

		http.addFilterBefore(new JSONSecurityFilter(authenticationManager()),
				UsernamePasswordAuthenticationFilter.class);

		http.logout().logoutSuccessUrl("/");

		// http.csrf().requireCsrfProtectionMatcher(request -> {
		// return !(request.getMethod().equalsIgnoreCase("GET")
		// || request.getRequestURI().equalsIgnoreCase("/login")
		// || request.getRequestURI().equalsIgnoreCase("/logout"));
		// });
		http.headers().frameOptions().disable();
		// @formatter:on
	}

	/**
	 * @return шифрователь паролей
	 */
	@Bean
	public static PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	/**
	 * @param userDetailsService
	 *            сервис данных пользователя
	 * @return провайдер аутентификации
	 */
	@Bean
	public DaoAuthenticationProvider daoAuthenticationProvider(final UserDetailsService userDetailsService) {
		final DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
		authProvider.setUserDetailsService(userDetailsService);
		authProvider.setPasswordEncoder(passwordEncoder());
		return authProvider;
	}

	/**
	 * Конфигурация провайдера аутентификации
	 * 
	 * @param auth
	 *            билдер
	 * @param userDetailsService
	 *            сервис данных пользователя
	 * @throws Exception
	 *             ошибка
	 */
	@Autowired
	public void configureGlobal(final AuthenticationManagerBuilder auth, final UserDetailsService userDetailsService)
			throws Exception {
		auth.authenticationProvider(daoAuthenticationProvider(userDetailsService))
				.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
	}
}
