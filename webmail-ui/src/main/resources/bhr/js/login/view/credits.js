define([
  'underscore'
  , 'backbone'
  , 'jquery'
  ,'handlebars'
  ,'login/collection/login-collection'
  ,'text!templates/login/credits.hbs'
  ,'../login-router'
  
], function (_, Backbone, $,handlebars,collection,templates,router) {



 

  View = Backbone.View.extend({
     el:'#credits',
	 template: Handlebars.compile(templates),
	 getData:'',
     events:{
      "click #button":"login",
	  "click #button1": "hello"
    },
	data:'',
        initialize: function(){
            console.log("test view is loaded");
			//$('body').append("<h1>test model is loaded</h1>");
var that = this;
var x = collection.fetchContacts('js/login/collection/login-view.json');
x.done(function(data){
console.log(data);
that.getData = data;
//$('body').append(template(data));
});
        },
		
		render: function(){
console.log(this.getData);
this.$el.append(this.template(this.getData));
$('#credits').hide();
return this;
		},
    });
    
    return new View();
	
	
});
