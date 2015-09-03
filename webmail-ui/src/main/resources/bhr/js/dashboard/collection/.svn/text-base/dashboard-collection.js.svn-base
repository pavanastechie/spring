define([
  'underscore'
  , 'backbone'
  , 'jquery'
  ,'dashboard/model/dashboard-model'
  
], function (_, Backbone, $,model) {
 Collection = Backbone.Collection.extend({
        initialize: function(){
            console.log(" dashboard collection is loaded");
			//$('body').append("<h2> test1 collection is loaded</h2>");
			
        },
		
		fetchData: function(url){
		var fetch = this.fetch({
        url: url,
        cache: false, // timestamp will add to the url if cache sets to false, in IE response coming from cache
      });
		return fetch;
		}
    });
    
    return new Collection();

});
