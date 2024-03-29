require.config({
  paths:{
    jquery: 'vendor/jquery-1.10.2',
    underscore: 'vendor/underscore-1.4.4',
    handlebars: 'vendor/handlebars.runtime-1.0.0',
    backbone: 'vendor/backbone-1.0.0',
    marionette: 'vendor/marionette-1.0.3',
    text: 'vendor/text-2.0.7'
  },
  shim: {
    underscore: {
      exports: '_'
    },
    handlebars: {
      exports: 'Handlebars'
    },
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    marionette: {
      deps: ['jquery', 'underscore', 'backbone'],
      exports: 'Backbone.Marionette'
    }
  }
});
