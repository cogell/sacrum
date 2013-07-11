// define(['backbone','marionette'], function(Backbone, Marionette){
define(function(require){

  var Backbone = require('backbone'),
      Marionette = require('marionette');

  var App = new Marionette.Application();

  App.addRegions({
    headerRegion: '#header-region',
    postsRegion: '#posts-region',
    postRegion: '#post-region'
  });

  App.on('initialize:after', function(){
    if (Backbone.history){
      Backbone.history.start();
    }
  });

  return App;

});
