package com.sci.user.dao;

import java.util.List;

import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Repository;

import com.sci.user.model.User;

@Repository
public interface UserDAO {
	public List<User> list();
	
	public User get(int id);
	
	public void saveOrUpdate(User user);
	@Secured("ROLE_ADMIN")
	public void delete(int id);
	
	public Boolean authenticate(User user);

	public String roles(User user);
}