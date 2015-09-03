define([
  'underscore'
  , 'backbone'
  , 'jquery'
  ,'handlebars'
  ,'dashboard/collection/dashboard-collection'
  ,'text!templates/dashboard/dashboard-home.hbs'
], function (_, Backbone, $,handlebars,collection,templates) {
     HomeView = Backbone.View.extend({
		el:'#dashboard-body',
		template:Handlebars.compile(templates),
        initialize: function(){
            console.log("dashboard-home is loaded");
			//$('body').append('<h1>test1 View is loaded</h1>');
        },
		
		render: function(){
		console.log("dashboard-home :: rendering loading");
		this.$el.find('.column-right').find('.box-in').append(this.template);
		}
    });
return new HomeView();
});
