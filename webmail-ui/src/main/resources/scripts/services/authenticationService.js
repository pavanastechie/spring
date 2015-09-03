angular.module('userManagementApp').factory('AuthenticationService', function( $http, $q, $log) {
	return{
	authenticationProcess: function(authData) {
        var deferred = $q.defer();
        console.log(authData);
        $http({
            url: 'users',
            dataType: 'json',
            method: 'POST',
            data: authData
        }).success(function(data) {
        	var returnData = data;
        	console.log(returnData.path);
        	window.location.replace(returnData.path);
        	
            deferred.resolve('Authentication Successfully');
        }).error(function() {
            deferred.reject('There was an error');
            console.log('Authentication Error');
        });
        return deferred.promise;
    },
	};
	
});