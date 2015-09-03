package com.sci.user.service;


import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import com.sci.user.model.User;

public class UserAuthenticationService implements AuthenticationManager {
	
	  public Authentication authenticate(Authentication auth) {
		  
		  User usr = new User();
		  usr.setPassword((String)auth.getCredentials());
		  usr.setUsername(auth.getName());
		  {
	      return new UsernamePasswordAuthenticationToken(auth.getName(),
	        auth.getCredentials(), auth.getAuthorities());
	      }
	  }
	  
	  
	  
}