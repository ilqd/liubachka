package ru.splashcourse.liuback;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@SpringBootApplication
@EnableTransactionManagement
@EnableAutoConfiguration
public class LiubackApplication {

	public static void main(String[] args) {
		StarterApplication.run(LiubackApplication.class, args);
	}
}
