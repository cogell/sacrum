define(['marionette', 'app', 'text!apps/blog/header/templates/_header.html'], function(Marionette, App, _HeaderTemplate){

  return App.module( 'Blog.HeaderApp', function(HeaderApp){

    HeaderApp.View = Marionette.ItemView.extend({

      template: _HeaderTemplate

    });

  });

});
