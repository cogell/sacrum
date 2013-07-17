require.config({
  paths:{
    jquery: 'vendor/jquery-2.0.2.min',
    underscore: 'vendor/underscore',
    handlebars: 'vendor/handlebars',
    backbone: 'vendor/backbone',
    marionette: 'vendor/marionette',
    text: 'vendor/text'
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
