define([
  'underscore'
  , 'backbone'
  , 'jquery'
  
], function (_, Backbone, $) {
	var Credential = Backbone.Model.extend({
		defaults: {
            "username": "",
            "password": "",
        },
        initialize: function() {
            console.log('Credential model has been initialized.');
            this.on('change', function(){
                console.log('- Values for this Credential model have changed.');
            });
        }
    });
    
    return new Credential;

});
