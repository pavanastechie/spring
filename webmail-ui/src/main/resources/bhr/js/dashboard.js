define(['./main'], function (main) {
require(['dashboard/view/dashboard-toolbar','dashboard/view/dashboard-container','dashboard/collection/dashboard-collection'], function (DashboardToolbar,DashboardContainer,DashboardCollection) {
  
	return console.log("main.js is loaded");
	MainView = Backbone.View.extend({
	initialize: function(){
			GLOBALVAR.holidays.done(function(data){
		GLOBALVAR.holidays = data;
		});
	}
	
	});
	return new MainView();
});
});