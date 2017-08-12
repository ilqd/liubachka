package ru.splashcourse.liuback;

import java.util.Arrays;

import org.springframework.boot.SpringApplication;
import org.springframework.core.env.ConfigurableEnvironment;

public class StarterApplication extends SpringApplication {
	@Override
	protected void configureProfiles(final ConfigurableEnvironment environment, final String[] args) {
		super.configureProfiles(environment, args);

		final boolean dev = environment.acceptsProfiles(StarterProfiles.DEV);

		final boolean productionActive = environment.acceptsProfiles(StarterProfiles.PRODUCTION);

		if (productionActive) {
			System.out.println("Activating production profile.");
		} else if (dev) {
			System.out.println("Activating developer profile.");
		} else {
			throw new IllegalStateException("Unknown profiles specified.");
		}

		Arrays.stream(environment.getActiveProfiles()).filter(p -> p.startsWith("module-"))
				.forEach(p -> System.out.println("Activate module: " + p.substring("module-".length())));
	}
}
