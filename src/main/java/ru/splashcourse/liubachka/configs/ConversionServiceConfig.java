package ru.splashcourse.liubachka.configs;

import org.springframework.beans.BeansException;
import org.springframework.beans.factory.config.BeanFactoryPostProcessor;
import org.springframework.beans.factory.config.ConfigurableListableBeanFactory;
import org.springframework.context.EnvironmentAware;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.ConversionService;
import org.springframework.core.env.AbstractEnvironment;
import org.springframework.core.env.Environment;
import org.springframework.data.repository.support.DomainClassConverter;
import org.springframework.format.support.DefaultFormattingConversionService;
import org.springframework.format.support.FormattingConversionService;

@Configuration
public class ConversionServiceConfig implements BeanFactoryPostProcessor, EnvironmentAware {

    private static final FormattingConversionService SERVICE = new DefaultFormattingConversionService();

    @Bean
    public static ConversionService conversionService() {
        return SERVICE;
    }

    @Bean
    public DomainClassConverter domainClassConverter() {
        return new DomainClassConverter(SERVICE);
    }

    @Override
    public void postProcessBeanFactory(ConfigurableListableBeanFactory beanFactory) throws BeansException {
        beanFactory.setConversionService(conversionService());
    }

    @Override
    public void setEnvironment(Environment environment) {
        ((AbstractEnvironment) environment).setConversionService(SERVICE);
    }
}
