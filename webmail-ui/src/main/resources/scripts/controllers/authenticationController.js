angular.module('userManagementApp').controller('AuthenticationController', function($scope,AuthenticationService) {
	console.log("AuthenticationController");
	$scope.authentication = function(){
		$scope.authData = {};
		$scope.authData["username"] = $scope.username;
		$scope.authData["password"] = $scope.password;
		var promise = AuthenticationService.authenticationProcess($scope.authData);
		promise.then(function(data) {
			//window.location.replace("users"); 
		});
	};
	
});