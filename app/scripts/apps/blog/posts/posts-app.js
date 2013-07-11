define(function(require){

  var App = require('app'),
      PostsAppC = require('apps/blog/posts/posts-controller');


  return App.module('Blog.PostsApp', function(PostsApp){

    PostsApp.Router =  Marionette.AppRouter.extend({
      appRoutes: {
        '': 'listPosts',
        'home': 'listPosts',
        'posts': 'listPosts',
        'posts/:id': 'showPost'
      }
    });

    var API = ({

      listPosts: function(){
        PostsApp.Controller.listPosts();
      },

      showPost: function( id ){
        PostsApp.Controller.showPost( id );
      }

    });

    // App.addInitializer(function(){
    PostsApp.addInitializer(function(){
      new PostsApp.Router({ controller: API });
    });

  });

});
