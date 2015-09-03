define([
    "jquery"
    ,'dashboard/model/dashboard-model'
], function($, Dashboard) {
	 var DashboardService = {
		        saveUser: function(userDetails) {

		           var promise = this.callApi("POST", "save", JSON.stringify(userDetails));
		           return promise;
		        },
		        deleteUser: function(userId) {
		        	 var promise = this.callApi("POST", "delete", JSON.stringify(userId));
			           return promise;
		        },
		        editUser: function(userId){
		        	 var promise = this.callApi("POST", "editData", JSON.stringify(userId));
			           return promise;
		        },
		        
		        logout: function(userId){
		        	 var promise = this.callApi("GET", "logout", "");
			           return promise;
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

		    return DashboardService;

});
