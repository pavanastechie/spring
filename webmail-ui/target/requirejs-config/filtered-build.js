({
  appDir: "../resources/js",
  baseUrl: ".",
  dir: "../resources/dist",
  modules: [
    {
      name: 'vendor',
      create: true,
      include: [
        'jquery'
        , "bootstrap"
        , 'backbone'
        , 'backbone-relational'
        , "jquery-ui"
        , 'jquery.ui.widget'
        , 'vendor/text'
        , 'moment'
        , 'handlebars'
        , "jquery-layout"
        , 'jquery-timer'
        , 'jquery-tokeninput'
        , 'jquery-placeholder'
        , 'jquery.iframe-transport'
        , 'jquery-fileupload'
        , 'jquery-placeholder'
        , 'pnotify'
        , 'jquery-ui-slider-pips'
        , 'tinyMCE'
        , 'spin'
        , 'calendar'
        , 'vcard'
        , 'vcf'
        , 'html5shiv'
      ]
    },

    {
      name: "app/email/email",
      include: [
        'app/email/views/email-body'
        , 'app/email/views/email-nav'
        , 'app/email/views/email-advsearch'
        , 'app/email/views/email-bottom-pane',
        , 'app/email/views/email-top-pane',
        , 'plugins'
        , 'text!templates/email/preview-welcome.hbs'
      ],
      exclude: [ 'vendor' ]
    },

    {
      name: "app/contacts/contacts",
      include: [
        'app/contacts/views/contacts-body'
        , 'app/contacts/views/contacts-home'
        , 'app/contacts/views/contacts-import'
        , 'app/contacts/views/contacts-export'
        , 'app/contacts/views/contacts-list'
        , 'app/contacts/views/contacts-nav-contacts'
        , 'app/contacts/views/contacts-toolbar'
        , 'text!templates/shared/header.hbs'
      ],
      exclude: [ 'vendor' ]
    },

    /*
    {
      name: 'app/calendar/calendar',
      include: [
      ],
      exclude: [ 'vendor' ]
    },
    */

    {
      name: 'app/files/files',
      include: [
        'app/files/views/files-body'
        , 'app/files/views/files-nav'
        , 'app/shared/views/header-view'
        , 'app/shared/views/toolbar-view'
      ],
      exclude: [ 'vendor' ]
    },

    {
      name: "app/tasks/views/tasks-body",
      include: [

      ],
      exclude: [ 'vendor' ]
    },

    {
      name: 'app/settings/views/settings-view',
      include: [

      ],
      exclude: [ 'vendor' ]
    }
  ],
  optimizeCss: 'none',
  removeCombined: false,
  paths: {
    'handlebars': "vendor/handlebars",
    'underscore': "vendor/underscore-min",
    'backbone': "vendor/backbone-min",
    'backbone.localStorage': "vendor/backbone.localStorage-min",
    'backbone-relational': "vendor/backbone-relational",
    'jquery': "vendor/require-jquery",
    'jquery-ui': "vendor/jquery-ui-1.10.4.custom.min",
    'jquery-layout': "vendor/jquery.layout-latest.min",
    'jquery.ui.widget': "vendor/jquery.ui.widget",
    'jquery.iframe-transport': "vendor/jquery.iframe-transport",
    'jquery-fileupload': "vendor/jquery.fileupload",
    'jquery-placeholder': "vendor/jquery.placeholder",
    'jquery-tokeninput': "vendor/jquery.tokeninput",
    'jquery-timer': "vendor/jquery.timer",
    'pnotify': "vendor/pnotify.custom.min",
    'jquery-ui-slider-pips': "vendor/jquery-ui-slider-pips",
    'bootstrap': "vendor/bootstrap.min",  // twitter bootstrap
    'bootstrap-datepicker': "vendor/bootstrap-datepicker",  // bootstrap datepicker
    'plugins': "app/plugins", // jquery or custom
    'moment': 'vendor/moment.min',
    'moment-timezone': 'vendor/moment-timezone.min',
    'calendar': "vendor/fullcalendar-custom",
    'tinyMCE': "vendor/tinymce/tinymce.min",
    'spin': "vendor/spin.min",
    'vcard': "vendor/vcard/vcard",
    'vcf': "vendor/vcard/vcf",
    'html5shiv': "vendor/html5shiv",
    'jquery-dot-dot': "vendor/jquery.dotdotdot.min",
    'qtip2':"vendor/jquery.qtip.min",
    'text': "vendor/text",  // requirejs plugin to load text resources or templates
    'i18n': "vendor/i18next.amd.withJQuery-1.7.3.min",
    templates: '../templates' // short cut so we can put our html outside the js dir
  },
  shim: {
    'jquery-layout': {
      deps: ['jquery', 'jquery-ui']
    },
    html5shiv: {
      exports: "html5shiv"
    },
    handlebars: {
      deps: ['html5shiv'],
      exports: "Handlebars"
    },
    underscore: {
      exports: "_"
    },
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    'backbone.localStorage': {
      deps: ['backbone'],
      exports: 'Backbone'
    },
    'backbone-relational': {
      deps: ['backbone']
    },
    tinyMCE: {
      exports: 'tinyMCE',
      init: function () {
        this.tinyMCE.DOM.events.domLoaded = true;
        return this.tinyMCE;
      }
    },
    'jquery-dot-dot' : {
      deps: ['jquery']
    },

    // Set up loading of some plugin/override modules
    'handlebars-helpers': [ 'handlebars' ]
  }
})