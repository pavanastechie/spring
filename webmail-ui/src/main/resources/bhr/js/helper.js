define(['jquery'
        ,'underscore'
        ,'backbone'
        ,'handlebars'
        ], function($, _, Backbone, handlebars) {

	Handlebars.registerHelper('fullName', function(person) {
  return person.firstName + " " + person.lastName;
});
console.log("yes.. loaded");
})
