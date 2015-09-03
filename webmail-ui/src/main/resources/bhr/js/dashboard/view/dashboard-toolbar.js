define([
  'underscore'
  , 'backbone'
  , 'jquery'
  ,'handlebars'
  ,'dashboard/dashboard-ds'
  ,'dashboard/collection/dashboard-collection'
  ,'text!templates/dashboard/dashboard-toolbar.hbs'
  
], function (_, Backbone, $,handlebars, dataService, collection,templates) {
     ToolBarView = Backbone.View.extend({
         el:'#dashboard-toolbar',
         events: {
        	"click #logout-btn": "logoutUser" 
         },
		 template:Handlebars.compile(templates),
        initialize: function(){
            console.log("dashboard-toolbar is loaded");
            this.dataService = dataService;
			this.render();
			//$('body').append('<h1>test1 View is loaded</h1>');
        },
		
		render: function(){
		console.log("dashboard toolbar :: rendering loading");
		this.$el.append(this.template);
		},
		
		logoutUser : function(){
			console.log("User logged out");
			var promise = this.dataService.logout();
	   		 promise.done(function(data){
	   			window.location.replace('login');
	   			});
		}
    });
return new ToolBarView();
});
