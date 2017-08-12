package ru.splashcourse.liuback.configs;

import javax.sql.DataSource;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;

import com.zaxxer.hikari.HikariDataSource;

/**
 * Конфигурация БД
 */
@Configuration
public class DatabaseConfig {

	/**
	 * Формирование ds
	 * 
	 * @param env
	 *            окружение приложения
	 * @return настроеный ds
	 */
	@Bean
	public DataSource dataSource(final Environment env) {
		final HikariDataSource ds = new HikariDataSource();
		ds.setJdbcUrl(env.getRequiredProperty("db.jdbcurl"));
		ds.setUsername(env.getRequiredProperty("db.username"));
		ds.setPassword(env.getRequiredProperty("db.password"));
		return ds;
	}

}
