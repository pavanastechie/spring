define([
  'underscore'
  , 'backbone'
  , 'jquery'
  ,'handlebars'
  ,'dashboard/model/dashboard-model'
  ,'dashboard/collection/dashboard-collection'
  ,'dashboard/dashboard-ds'
  ,'text!templates/dashboard/dashboard-new.hbs'
  ,'events'
], function (_, Backbone, $, handlebars, model, collection, DashBoardServices, templates, Events) {
     EditOrNewView = Backbone.View.extend({
		el:'#dashboard-body',
		events:{
		
		"click #submit_btn":"saveUser"
		
		},
		template: Handlebars.compile(templates),
        initialize: function(){
        	this.listenTo(Events, 'FormClear', this.formClear);
        	this.model = model;
        	this.dashBoardServices = DashBoardServices;
            console.log("dashboard-new is loaded");
			//$('body').append('<h1>test1 View is loaded</h1>');
        },
		
		render: function(){
		console.log("dashboard-new :: rendering loading");
		this.$el.find('.column-right').find('.box-in').append(this.template());
		},
		saveUser: function(e){
			console.log("dashboard-new.js :: saveUser()");
			 var msg = null;
			 var id = $('#userId').val();
			var username = $('#username').val();
			var password = $('#password').val();
			var email = $('#email').val();
			var role = $('#role').val();
			this.model.set('id', id);
			this.model.set('username', username);
			this.model.set('password', password);
			this.model.set('email', email);
			this.model.set('role', role);
			if(username == "")
		         msg = "Please Enter User Name";
		       else if(email == "" || !this.validateEmail(email)) 
		           msg = "Please Enter Valid Email";
		       else if(password == "") 
		           msg = "Please Enter Password";
		       else if(role == "") 
		           msg = "Please Enter Role";
		       if(msg != null) 
		         $('#error_msg').text(msg);
			if(username != "" && password != "" && this.validateEmail(email) && role != ""){
			var promise = this.dashBoardServices.saveUser(this.model);
			promise.done(function(data){
				console.log(data);
				Events.trigger('RefreshNav');
				$('#user-edit-new').hide();
				$('#details').hide();
				$('#home').show();
				});
			promise.fail(function(data){
				console.log(data.status);
				if(data.status == 403){
					alert(data.responseText);
				}
				
				});
			}
		},
		
		formClear: function() {
			$('#userId').val('');
			$('#username').val('');
			$('#email').val('');
			$('#password').val('');
			$('#role').val('');
		},
		
		validateEmail: function(email) {
		    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		    return re.test(email);
		}
		
    });
return new EditOrNewView();
});
		