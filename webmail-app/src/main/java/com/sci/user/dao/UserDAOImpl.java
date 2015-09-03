package com.sci.user.dao;

import java.util.List;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.sci.user.model.User;

@Repository
public class UserDAOImpl implements UserDAO {
	@Autowired
	private SessionFactory sessionFactory;
	
	private static final Logger logger = Logger.getLogger(UserDAOImpl.class);

	public UserDAOImpl() {
		
	}
	
	

	@Override
	public List<User> list() {
		logger.info("In UserDAOImpl : list");
		@SuppressWarnings("unchecked")
		List<User> listUser = (List<User>) sessionFactory.getCurrentSession()
				.createCriteria(User.class)
				.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY).list();

		return listUser;	
	}

	@Override
	public void saveOrUpdate(User user) {
		logger.info("In UserDAOImpl : saveOrUpdate");
		sessionFactory.getCurrentSession().saveOrUpdate(user);
	}

	@Override
	public void delete(int id) {
		logger.info("In UserDAOImpl : delete");
		User userToDelete = new User();
		userToDelete.setId(id);
		sessionFactory.getCurrentSession().delete(userToDelete);
	}

	@Override
	public User get(int id) {
		logger.info("In UserDAOImpl : get");
		String hql = "from User where id=" + id;
		Query query = sessionFactory.getCurrentSession().createQuery(hql);
		
		@SuppressWarnings("unchecked")
		List<User> listUser = (List<User>) query.list();
		
		if (listUser != null && !listUser.isEmpty()) {
			return listUser.get(0);
		}
		
		return null;
	}

	@Override
	public Boolean authenticate(User user) {
		logger.info("In UserDAOImpl : authenticate");
		String hql = "from User where username='" + user.getUsername() +"' and password='" +user.getPassword()+"'";
		Boolean userExists = false;
		Query query = sessionFactory.getCurrentSession().createQuery(hql);
		
		@SuppressWarnings("unchecked")
		List<User> listUser = (List<User>) query.list();
		if (listUser != null && listUser.size() > 0) {
			userExists = true;
		}
		
		return userExists;
		
	}
	
	@Override
	public String roles(User user){
		String role = "";
		String hql = "SELECT  role FROM User  WHERE  username='" + user.getUsername() +"' and password='" +user.getPassword()+"'" ;
	Query query = sessionFactory.getCurrentSession().createQuery(hql);
	@SuppressWarnings("unchecked")
	List listUser =  query.list();
	if (listUser != null && listUser.size() > 0) {
			List<String> list =  query.list();
			
			for(String listItem: list){
				role = listItem;
			}
			
	}
	
	return role;
		
	}
}