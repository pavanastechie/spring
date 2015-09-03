define([
  'underscore'
  , 'backbone'
  , 'jquery'
  ,'login/model/login-model'
  
], function (_, Backbone, $,model) {
 Collection = Backbone.Collection.extend({
 fire:'',
        initialize: function(){
            console.log("test collection is loaded");
			//$('body').append("<h2> test collection is loaded</h2>");
	   
        },
		
		 fetchContacts: function(url) {
    	var that = this;
       
	 var x = that.fetch({
        url: url,
        cache: false, // timestamp will add to the url if cache sets to false, in IE response coming from cache
       success: function(data) {
	   GLOBALVAR.credits = data;
       return data;
}
      });
	 
	  
     return x; 
    }
    });
    
    return new Collection();

});
