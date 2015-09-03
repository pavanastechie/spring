define([
  'underscore'
  , 'backbone'
  , 'jquery'
  ,'test/collection/check-collection'
  
], function (_, Backbone, $,collection) {

var AppRouter = Backbone.Router.extend({
 routes: {
 "/login": "defaultRoute" // matches http://example.com/#a\
}
 });
 // Initiate the router
 var app_router = new AppRouter;

 app_router.on('route:defaultRoute', function(actions) {
 console.log("yes....");
  window.location.replace('file:///C:/Users/bm133.SCIIT/Desktop/New%20folder%20(2)/backbone/test1.html');

 });

 // Start Backbone history a necessary step for bookmarkable URL's
 Backbone.history.start();
 });