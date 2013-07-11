define(['app', 'apps/blog/header/header-views'], function(App){

  return App.module( 'Blog.HeaderApp', function(HeaderApp){

    HeaderApp.Controller = ({

      showHeader: function(){
        var headerView = new HeaderApp.View();
        App.headerRegion.show( headerView );
      }

    });

  });

});
