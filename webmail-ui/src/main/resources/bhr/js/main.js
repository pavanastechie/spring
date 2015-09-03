var GLOBALVAR = window.GLOBALVAR || {};
GLOBALVAR.credits = {};
GLOBALVAR.holidays = {};


require.config({
   
    paths: {
        'jquery': 'vendor/jquery.min',
        'backbone': 'vendor/backbone-min',
        'underscore': 'vendor/underscore-min',
        'html5shiv': "vendor/html5shiv.min",
        'text': 'vendor/text',
		'handlebars':'vendor/handlebars.min'
		,templates: '../templates'
    },
     shim: {
	jquery: {
      exports: "$"
    },
    underscore: {
        exports: "_"
      },
   backbone: {
    deps: ['underscore', 'jquery'],
    exports: 'Backbone'
  },
    html5shiv: {
        exports: "html5shiv"
      },
      handlebars: {
        deps: ['html5shiv'],
        exports: "Handlebars"
      },
     
    },
    deps: ['require'],
});


{require([
   ""]
   , function () {
console.log("require.config is loaded");
 });
}

// {require([
  // "test"]
  // , function (test) {

// });
//}
