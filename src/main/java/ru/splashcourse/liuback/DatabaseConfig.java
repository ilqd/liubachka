package ru.splashcourse.liuback;

import com.zaxxer.hikari.HikariDataSource;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;

import javax.sql.DataSource;

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
