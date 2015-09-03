define([
  'underscore'
  , 'backbone'
  , 'jquery'
  
], function (_, Backbone, $) {

var AppRouter = Backbone.Router.extend({
 routes: {
 "login": "home" // matches http://example.com/#a\
},
home: function(){

 
  window.location.replace('list');
  
 
},

 });
 Backbone.history.start();
  return new AppRouter();
 });