// define(['app', 'apps/blog/posts/posts-views', 'apps/blog/posts/posts-entities'],function(App){

define(function(require){

  var App = require('app'),
      PostViews = require('apps/blog/posts/posts-views'),
      PostEnitities = require('apps/blog/posts/posts-entities');

  return App.module('Blog.PostsApp', function(PostsApp){

    PostsApp.Controller = ({

      listPosts: function(){
        // clear single posts, postRegion
        App.postRegion.close();
        // create new collection
        var c = new PostsApp.PostsCollection();
        c.fetch();
        // create new collection view
        var v = new PostsApp.Posts({ collection: c });
        // show view in app region, postsRegion
        App.postsRegion.show( v );
      },

      showPost: function( id ){
        var c = new PostsApp.PostsCollection();
        c.fetch();
        var v = new PostsApp.PostSingle({ collection: c, modelId: id });
        App.postRegion.show( v );
      }

    });

  });

});
