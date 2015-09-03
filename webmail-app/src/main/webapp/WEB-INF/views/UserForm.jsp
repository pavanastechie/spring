<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>New or Edit User</title>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">
<link href="resources/css/style.css" rel="stylesheet">
<script type="text/javascript">
$(document).ready(function() {
   $('#submit_btn').click(function() {
       var userName = $('#username').val();
       var passowrd = $('#password').val();
       var role = $('#role').val();
       var email = $('#email').val();
       var msg = null;
       if(userName == "")
         msg = "Please Enter User Name";
       else if(email == "" || !validateEmail(email)) 
           msg = "Please Enter Valid Email";
       else if(passowrd == "") 
           msg = "Please Enter Password";
       else if(role == "") 
           msg = "Please Enter Role";
       if(msg != null) {
         $('#error_msg').text(msg);
         return false;  
       }
   });
   
   function validateEmail(email) {
	    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    return re.test(email);
	}
});
</script>
</head>
<body class="usrmgt-body">		

</body>
</html>