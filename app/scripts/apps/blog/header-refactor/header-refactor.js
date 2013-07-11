define(function(require){

  var App = require('app');
  var DisplaySeed = require('primatives/Display');
  var _header = require('text!apps/blog/header-refactor/templates/_header.html');

  App.module('Blog.HeaderRefactor', DisplaySeed);

  return App.module('Blog.HeaderRefactor', function(HeaderRefactor){

    // CONFIGURATION
    HeaderRefactor.showRegion = App.headerRegion;

    // EXTEND
    HeaderRefactor.ItemView = HeaderRefactor.ItemView.extend({
      template: _header,
      className: 'header'
    });

    HeaderRefactor.addInitializer(function(){
      HeaderRefactor.API.show();
      // console.log('header refactor app started!');
    });

  });

});
