package com.sci.user.config;

import java.util.Properties;

import javax.sql.DataSource;

import org.apache.commons.dbcp2.BasicDataSource;
import org.apache.log4j.Logger;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.context.annotation.Profile;
import org.springframework.context.support.PropertySourcesPlaceholderConfigurer;
import org.springframework.core.io.ClassPathResource;
import org.springframework.orm.hibernate4.HibernateTransactionManager;
import org.springframework.orm.hibernate4.LocalSessionFactoryBuilder;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.servlet.config.annotation.DefaultServletHandlerConfigurer;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.view.InternalResourceViewResolver;

import com.sci.user.config.SecurityConfig;
import com.sci.user.model.User;

@EnableWebMvc
@Configuration
@ComponentScan("com.sci.user.*")
@Import({ SecurityConfig.class })
@EnableTransactionManagement

public class AppConfig extends WebMvcConfigurerAdapter {
	private static final Logger logger = Logger.getLogger(AppConfig.class);
	 
    @Bean(name = "viewResolver")
    public InternalResourceViewResolver getViewResolver() {
		logger.info("Start ApplicationContextConfig : getViewResolver");
        InternalResourceViewResolver viewResolver = new InternalResourceViewResolver();
        viewResolver.setPrefix("/WEB-INF/views/");
        viewResolver.setSuffix(".jsp");
		logger.info("End ApplicationContextConfig : getViewResolver");
        return viewResolver;
    }
     
    
    @Bean(name = "dataSource")
    public DataSource getDataSource() {
		logger.info("Start ApplicationContextConfig : getDataSource");
		System.out.println("-----------------------------------------------------------------------------------------------------------------------------------------");
		//System.out.println(propertyField);
    	BasicDataSource dataSource = new BasicDataSource();
    	dataSource.setDriverClassName("com.mysql.jdbc.Driver");
    	dataSource.setUrl(propertyField);
    	dataSource.setUsername("root");
    	dataSource.setPassword("");
    	logger.info("End ApplicationContextConfig : getDataSource");
    	return dataSource;
    }
    
    
    private Properties getHibernateProperties() {
		logger.info("Start ApplicationContextConfig : getHibernateProperties");
    	Properties properties = new Properties();
    	properties.put("hibernate.show_sql", "true");
    	properties.put("hibernate.dialect", "org.hibernate.dialect.MySQLDialect");
    	logger.info("End ApplicationContextConfig : getHibernateProperties");
    	return properties;
    }
    public @Value("${jdbc.url}") String propertyField;
    @Bean
    public static PropertySourcesPlaceholderConfigurer propertyPlaceholderConfigurer() {
        String activeProfile = System.getProperty("spring.profiles.active", "dev");
        String propertiesFilename = "db-" + activeProfile + ".properties";

        PropertySourcesPlaceholderConfigurer configurer = new PropertySourcesPlaceholderConfigurer();
        configurer.setLocation(new ClassPathResource(propertiesFilename));

        return configurer;
    }
    
    @Bean(name = "sessionFactory")
    public SessionFactory getSessionFactory(DataSource dataSource) {
		logger.info("Start ApplicationContextConfig : getSessionFactory");
    	LocalSessionFactoryBuilder sessionBuilder = new LocalSessionFactoryBuilder(dataSource);
    	sessionBuilder.addProperties(getHibernateProperties());
    	sessionBuilder.addAnnotatedClasses(User.class);
    	logger.info("End ApplicationContextConfig : getSessionFactory");
    	return sessionBuilder.buildSessionFactory();
    }
    
	@Bean(name = "transactionManager")
	public HibernateTransactionManager getTransactionManager(
			SessionFactory sessionFactory) {
		logger.info("Start ApplicationContextConfig : getTransactionManager");
		HibernateTransactionManager transactionManager = new HibernateTransactionManager(
				sessionFactory);
		logger.info("End ApplicationContextConfig : getTransactionManager");
		return transactionManager;
	}
    
    // this optional in the config
    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/").setViewName("index");
    }

    @Override
    public void configureDefaultServletHandling(DefaultServletHandlerConfigurer configurer) {
        configurer.enable();
    }
    
}
