package com.sci.user.service;

import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.transaction.annotation.Transactional;

import com.sci.user.dao.UserDAO;
import com.sci.user.model.User;

	public class UserServiceImpl implements UserService {
	
		private static final Logger logger = Logger.getLogger(UserServiceImpl.class);
		
		@Autowired
		private UserDAO userDao;
		
		public UserServiceImpl() {
			
		}
	
		@Override
		@Transactional
		public List<User> list() {
			logger.info("In UserServiceImpl : list");
			return userDao.list();
		}
	
		@Override
		@Transactional
		public User get(int id) {
			logger.info("In UserServiceImpl : get");
			return userDao.get(id);
		}
	
		@Override
		@Transactional
		public void saveOrUpdate(User user) {
			logger.info("In UserServiceImpl : saveOrUpdate");
			 userDao.saveOrUpdate(user);
			
		}
	
		@Override
		@Transactional
		public void delete(int id) {
			logger.info("In UserServiceImpl : delete");
			userDao.delete(id);
			
		}
	
		@Override
		@Transactional
		public Boolean authenticate(User user) {
			
			logger.info("In UserServiceImpl : authenticate");
			return userDao.authenticate(user);
		}

		@Override
		@Transactional
		public String roles(User user) {
			return userDao.roles(user);
		}

}

	
	