define([
  'underscore'
  , 'backbone'
  , 'jquery'
  ,'handlebars'
  ,'dashboard/collection/dashboard-collection'
  ,'text!templates/dashboard/dashboard-nav.hbs'
  ,'events'
], function (_, Backbone, $,handlebars,collection,templates,Events) {
     NavView = Backbone.View.extend({
		el:'#dashboard-nav',
		events:{
		
		"click li":"userDetails",
		"click #create-user": "showCreateUser",
		
		},
		template: Handlebars.compile(templates),
        initialize: function(){
            console.log("dashboard-nav is loaded");
            this.listenTo(Events, 'RefreshNav', this.refreshNav);
            
            this.collection = collection;
			//$('body').append('<h1>test1 View is loaded</h1>');
        },
        refresh: function() {
        	console.log("dashboard-nav() :: refresh()");
        	var that = this;
        	var promise = this.collection.fetchData('getAllUsers');
   		 promise.done(function(data){
   			that.userDetailsCollection = data;
   		   that.render();
   			});
   		
        },
		
		render: function(){
		console.log("dashboard-nav :: rendering loading");
		if(this.userDetailsCollection != null && this.userDetailsCollection != ""){
		GLOBALVAR.holidays = this.userDetailsCollection;
		}
		this.$el.html(this.template(GLOBALVAR.holidays));
		},
		refreshNav: function(){
		 console.log("dashboard-nav :: refreshNav()");
		 this.refresh();
		},
		userDetails: function(e){
			$('#user-edit-new').hide();
			$('#details').show();
			$('#home').hide();
		var Id;
		var currentEle;
		if($(e.target).attr('class') == 'left-nav'){
		currentEle = $(e.target);
		Id = parseInt($(e.target).attr('id'));
		}
		else{
		 Id = parseInt($(e.target).parent().attr('id'));
		 currentEle = $(e.target).parent();
		 }
		
		
		$('.left-nav').each(function(){
		if($(this).attr('id') != currentEle.attr('id')){
		$(this).removeClass('selected');
		 $(this).unbind( "click" );
		
		}
                else{
                 currentEle.addClass('selected');
				 currentEle.bind('click', false);
                      }
		
		});
		
		Events.trigger('GetData',Id, GLOBALVAR.holidays);
		
		},
		
		showCreateUser: function() {
			console.log("dashboard-nav :: showCreateUser()");
			$('#user-edit-new').show();
			$('#details').hide();
			$('#home').hide();
			Events.trigger('FormClear');
			$('.left-nav').each(function(){
				$(this).removeClass('selected');				
				$(this).unbind( "click" );
				});
		},
		
		
		
		
    });
return new NavView();
});
		