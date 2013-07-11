define(['app', 'apps/blog/header/header-controller'], function(App, Controller){

  return App.module('Blog.HeaderApp', function(HeaderApp){

    // gets started with parent app, App

    // doesnt get a router, it is persistant across the frontend

    var API = ({
      showHeader: function(){
        HeaderApp.Controller.showHeader();
      }
    });

    HeaderApp.on('start', function(){
      API.showHeader();
    });

  });

});
