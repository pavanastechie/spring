define([
  'underscore'
  , 'backbone'
  , 'jquery'
  ,'handlebars'
  ,'dashboard/collection/dashboard-collection'
  ,'dashboard/dashboard-ds'
  ,'text!templates/dashboard/dashboard-details.hbs'
  ,'events'
], function (_, Backbone, $,handlebars,collection, DataService,templates,Events) {
     HomeView = Backbone.View.extend({
		el:'#dashboard-body',
		events: {
			"click #edit-user": "showEditUser",
			"click #delete-user": "deleteUser"
		},
		model:'',
		template:Handlebars.compile(templates),
        initialize: function(){
		this.listenTo(Events, 'GetData', this.getData);
            console.log("dashboard-details is loaded");

            this.dataService = DataService;
        },
		
		render: function(){
		console.log("dashboard-details :: rendering loading");
		this.$el.find('.column-right').find('.box-in').append(this.template(this.model));
		},
		getData: function(data, users){
			console.log("getData()");
		if(users != null && users != ""){
			this.oldData =this.model;
			GLOBALVAR.holidays = users;
		}
		this.model = _.where(GLOBALVAR.holidays, {id: data});
		var changesExists = _.difference(this.oldData,this.model);
		 if(data != $('#details').find('table').find('tr').attr('id') || changesExists != null){
		 $('#details').remove();
		 this.render();
		 }
		
		$('#home').hide();
		},
		
		showEditUser: function(e) {
			console.log("dashboard-nav :: showEditUser()");
			$('#user-edit-new').show();
			$('#details').hide();
			$('#home').hide();
			console.log(parseInt($(e.target).attr("data-id")));
			var userId = parseInt($(e.target).attr("data-id"));
			//this.dataService.delete()
			if(userId != null){
				var JsonString = {};
				JsonString["id"] = userId;
			var promise = this.dataService.editUser(JsonString);
			promise.done(function(data){
				console.log(data.id);
				$('#userId').val(data.id);
				$('#username').val(data.username);
				$('#email').val(data.email);
				$('#password').val(data.password);
				$('#role').val(data.role);
				});
			}
			
		},
		
		deleteUser: function(e) {
			console.log("dashboard-nav :: deleteUser()");
			console.log(parseInt($(e.target).attr("data-id")));
			var userId = parseInt($(e.target).attr("data-id"));
			//this.dataService.delete()
			if(userId != null){
				var JsonString = {};
				JsonString["id"] = userId;
			var promise = this.dataService.deleteUser(JsonString);
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
			
		}
    });
return new HomeView();
});
