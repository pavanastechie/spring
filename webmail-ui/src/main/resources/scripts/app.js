//Define an angular module for our app
var userManagementApp = angular.module('userManagementApp', []);

//Define Routing for app
//Uri /AddNewOrder -> template AddOrder.html and Controller AddOrderController
//Uri /ShowOrders -> template ShowOrders.html and Controller AddOrderController
userManagementApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/AddNewOrder', {
	templateUrl: 'resources/partials/add_order.html',
	controller: 'AddOrderController'
      }).
      when('/ShowOrders', {
	templateUrl: 'resources/partials/show_orders.html',
	controller: 'ShowOrdersController'
      }).
      otherwise({
	redirectTo: '/AddNewOrder'
      });
}]);
