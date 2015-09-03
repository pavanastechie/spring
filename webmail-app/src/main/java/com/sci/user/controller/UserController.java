package com.sci.user.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.bind.annotation.RequestBody;

import com.sci.user.model.User;
import com.sci.user.service.UserAuthenticationService;
import com.sci.user.service.UserService;

/**
 * Handles requests for the application home page.
 */
@Controller
public class UserController {
	
	private static AuthenticationManager authenticationManager = new UserAuthenticationService();
	
	@Autowired
	private UserService userService;
	
	private static final Logger logger = Logger.getLogger(UserController.class);

	@RequestMapping( value = {"/", "login"})
	public ModelAndView login() throws Exception {
		logger.info("In UserController: login");
		ModelAndView model = new ModelAndView("Login");
		model.addObject("user", new User());
		return model;
	}
	
	/*@RequestMapping(value = "users",method = RequestMethod.POST)
	public ModelAndView users(@ModelAttribute User user) throws Exception {
		logger.info("In UserController: login");
		Boolean userExists = userService.authenticate(user);
		ModelAndView model = new ModelAndView();
		if(userExists) {
		  List<User> listUsers = userService.list();
		  model = new ModelAndView("UserList");
		  model.addObject("userList", listUsers);
		  return model;
		} else {
			model.setViewName("Login");
			model.addObject("user", new User());
			model.addObject("errorMsg", "Username or Password entered does not exits");
		}
		
		return model;
	}*/
	
	
	@RequestMapping(consumes ="application/json", produces = "application/json", value = "users",method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> users(@RequestBody User user, HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		Boolean userExist = userService.authenticate(user);
		 if(userExist){
		     
		    	String roles = userService.roles(user);
		    	
		    	List<GrantedAuthority> AUTHORITIES = new ArrayList<GrantedAuthority>();
		    	AUTHORITIES.add(new SimpleGrantedAuthority(roles));
		        Authentication req = new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword(), AUTHORITIES);
		        Authentication result = authenticationManager.authenticate(req);
		        SecurityContextHolder.getContext().setAuthentication(result);
		        Map<String,Object> results = new HashMap<String,Object>();
		        results.put("path","list");
		        return results;
		    	  
		 } else {
		    	  Map<String,Object> results = new HashMap<String,Object>();
					results.put("path","login");
			        return results;
		      }    
		 
	}
	
	@RequestMapping(value = "new", method = RequestMethod.GET)
	@Secured("ROLE_ADMIN")
	public ModelAndView newUser() throws Exception {
		logger.info("In UserController: newUser");
		ModelAndView model = new ModelAndView("UserForm");
		model.addObject("user", new User());
		return model;
	}
	
	@RequestMapping(value = "edit", method = RequestMethod.GET)
	@Secured("ROLE_ADMIN")
	public ModelAndView editUser(HttpServletRequest request) {
		logger.info("In UserController: editUser");
		int userId = Integer.parseInt(request.getParameter("id"));
		User user = userService.get(userId);
		ModelAndView model = new ModelAndView("UserForm");
		model.addObject("user", user);
		return model;		
	}
	
	/*http://localhost:8080/UserManagement/editData?id=3*/	
	@Secured("ROLE_ADMIN")
	@RequestMapping(value = "editData", method = RequestMethod.POST)
	public @ResponseBody Map<String, Object> editUser(@RequestBody User user) {
		User usr = userService.get(user.getId());
		Map<String,Object> results = new HashMap<String,Object>();
        results.put("id",usr.getId());
        results.put("username",usr.getUsername());
        results.put("email",usr.getEmail());
        results.put("password",usr.getPassword());
        results.put("role",usr.getRole());
		 
		return results;
	}
	
	@RequestMapping(value = "delete", method = RequestMethod.POST)
	@Secured("ROLE_ADMIN")
	@ResponseBody
	public Map<String, Object> deleteUser(@RequestBody User user, HttpServletRequest request, HttpServletResponse response) throws Exception {
		logger.info("In UserController: deleteUser");
		userService.delete(user.getId());
		Map<String,Object> results = new HashMap<String,Object>();
        results.put("result","Success");
        return results;
	}
	@Secured("ROLE_ADMIN")
	@RequestMapping(value = "save", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> saveUser(@RequestBody User user, HttpServletRequest request, HttpServletResponse response) throws Exception {
		logger.info("In UserController: saveUser");
		userService.saveOrUpdate(user);
		 Map<String,Object> results = new HashMap<String,Object>();
	        results.put("Id",user.getId());
	        results.put("username",user.getUsername());
	        return results;
	}
	
	@RequestMapping("list")
	public ModelAndView listUsers() throws Exception {
		logger.info("In UserController: listUsers");
		List<User> listUsers = userService.list();
		ModelAndView model = new ModelAndView("UserList");
		model.addObject("userList", listUsers);
		return model;
	}
	
	@RequestMapping("logout")
	public ModelAndView logout() throws Exception {
		logger.info("In UserController: logout");
		ModelAndView model = new ModelAndView("Login");
		model.addObject("user", new User());
		return model;
	}
	
	@RequestMapping(value = "/getAllUsers", method = RequestMethod.GET, produces="application/json")
	public @ResponseBody List<User> restUser() {
		/*User usr = new User();*/
		List<User> listUsers = userService.list();
      /*  usr.setId(1);
        usr.setEmail("pavandevu@gmail.com");
        usr.setUsername("pavan");
        usr.setPassword("hello");
        Map<String, Object> results = new HashMap<>();
		 results.put("data", usr);
		 results.put("data", listUsers);
	        return results;*/
		return listUsers;
	}
	
	@RequestMapping(value = "/403")
	 @ResponseBody
	public String accesssDenied() {
		
		return "You have No Permissions To Perform This Operation  - Access is denied";

	}
	
}

