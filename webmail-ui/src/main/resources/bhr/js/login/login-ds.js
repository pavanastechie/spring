define([
    "jquery"
    ,'login/model/login-model'
], function($, Credential) {
	 var AuthenticationService = {
		        authenticate: function(credential) {

		           var auth = this.callApi("POST", "users", JSON.stringify(credential));
		           return auth;
		        },
		        
		        
		        callApi: function(methodType, apiUrl, data) {
		            // Build up the jQuery ajax options object.
		            //   We do this separately so we can make some branching decisions about which options are used
		            var ajaxOptions = {
		              type: methodType,
		              url: apiUrl,
		              data: data,
		              contentType: "application/json; charset=utf-8",
		            };

		            // Override/customize some options based on input

		            var promise = $.ajax(ajaxOptions);
		            promise.done(function (data) {
		              if(console && console.log) {
		                console.log("After done, result :", data);
		              }
		            });
		            
		            return promise;
		          },
		    };

		    return AuthenticationService;

});
