package com.sci.user.config;

import org.apache.log4j.Logger;
import org.springframework.context.annotation.Bean;

import com.sci.user.dao.UserDAO;
import com.sci.user.dao.UserDAOImpl;
import com.sci.user.service.UserService;
import com.sci.user.service.UserServiceImpl;

public class UserConfig {
	private static final Logger logger = Logger.getLogger(UserConfig.class);
	 @Bean(name = "userDao")
	    public UserDAO getUserDao() {
			logger.info("Start UserConfig : getUserDao");
	    	return new UserDAOImpl();
	    }
	    
	    @Bean(name = "userService")
	    public UserService getUserService() {
			logger.info("Start UserConfig : getUserService");
	    	return new UserServiceImpl();
	    }
}
