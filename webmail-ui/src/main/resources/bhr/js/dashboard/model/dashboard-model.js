define([
  'underscore'
  , 'backbone'
  , 'jquery'
  
], function (_, Backbone, $) {
 Model = Backbone.Model.extend({
	 
	 defaults: {
		 "id":"",
         "username": "",
         "password": "",
         "email": "",
         "role": ""
         
     },
        initialize: function(){
            console.log("dashboard model is loaded");
			//$('body').append("<h3> test1 model is loaded</h3>");
        }
    });
    
    return new Model();

});
