define([
  'underscore'
  , 'backbone'
  , 'jquery'
  ,'handlebars'
  ,'login/model/login-model'
  ,'login/collection/login-collection'
  ,'login/login-ds'
  ,'text!templates/login/login-view.hbs'
  ,'../login-router'
  
], function (_, Backbone, $, handlebars, LoginModel, collection, AuthenticationService, templates, router) {



 

  View = Backbone.View.extend({
     el:'#login-container',
	 template:Handlebars.compile(templates),
	 getData:'',
     events:{
      "click #button":"login",
	  "click #button1": "userNamePassword"
    },
	data:'',
        initialize: function(){
            console.log("test view is loaded");
			//$('body').append("<h1>test model is loaded</h1>");
            var that = this;
            this.model = LoginModel;
            this.authenticationService = AuthenticationService;
            var x = collection.fetchContacts('resources/bhr/js/login/collection/login-view.json');
            x.done(function(data){
            	console.log(data);
that.getData = data;
that.render();
//$('body').append(template(data));
});
        },
		
		render: function(){
console.log(this.getData);
$('#login-container').append(this.template(this.getData));
return this;
		},
		
		login: function(){
		console.log($('#password').val() +  "  "+$('#username').val());
		var username = $('#username').val();
		var password = $('#password').val();
		var msg = '';
		this.model.set('username', username);
		this.model.set('password', password);
		if(username=="")
		     msg = "Please Enter User Name";
		   else if(password =="") 
		     msg = "Please Enter Password";
		   
		   if(msg != null) {
		     $('#error_msg').text(msg);
		   }
		
		if(username!="" && password !=""){
		var promise = this.authenticationService.authenticate(this.model);
		 promise.done(function(data){
			 router.navigate('login', true);
			});
		}
		if($('#password').val() == this.getData.password && $('#username').val() == this.getData.username){
		//router.navigate('login', true);
		   //router.home();
		}
		},
		
		userNamePassword: function(){
		$('#credits').show();
	var data = GLOBALVAR.credits.toJSON();
		console.log(data[0].username+" --- "+data[0].password);
		if($('#hint').is(':empty'))
		$('#hint').append('<h2 style="color:#ffffff; margin-left: 335px;">username:'+data[0].username+'</h2><h2 style="color:#ffffff; margin-left: 335px;">password:'+data[0].password+'</h2>');
		
		}
		
		
		
    });
    
    return new View();
	
	
});
