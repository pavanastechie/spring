define([
  'underscore'
  , 'backbone'
  , 'jquery'
 ,'handlebars'
  ,'dashboard/collection/dashboard-collection'
  ,'text!templates/dashboard/dashboard-body.hbs'
  ,'dashboard/view/dashboard-home'
  ,'dashboard/view/dashboard-details'
  ,'dashboard/view/dashboard-new'
  ,'events'
  
], function (_, Backbone, $,handlebars,collection,templates,DashboardHome,DashboardDetails,DashboardNewEdit, Events) {
     BodyView = Backbone.View.extend({
		el:'#dashboard-body',
		template:Handlebars.compile(templates),
        initialize: function(){
            console.log("dashboard-body is loaded");
			this.listenTo(Events, 'Hello', this.hello);
			//$('body').append('<h1>test1 View is loaded</h1>');
        },
		
		render: function(){
		console.log("dashboard-body :: rendering loading");
		this.$el.append(this.template);
		DashboardHome.render();
		DashboardDetails.render();
		DashboardNewEdit.render();
		$('#details').hide();
		$('#user-edit-new').hide();
		},
		hello: function(){
		
		}
    });
return new BodyView();
});
