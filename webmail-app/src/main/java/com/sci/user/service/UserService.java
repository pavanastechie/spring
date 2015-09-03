package com.sci.user.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.sci.user.model.User;
@Service
public interface UserService {
public List<User> list();
	
	public User get(int id);
	
	public void saveOrUpdate(User user);
	
	public void delete(int id);
	
	public Boolean authenticate(User user);
	public String roles(User user);
}
