define(['app', 'apps/admin/posts/posts-controller'], function(App){

  return App.module('Admin.Posts', function(Posts){

    Posts.Router = Marionette.AppRouter.extend({
      appRoutes: {
        'admin/posts': 'listPosts',
        'admin/posts/new': 'createPost',
        'admin/posts/:id': 'editPost'
      }
    });

    var API = ({
      listPosts: function(){
        Posts.Controller.listPosts();
      },

      createPost: function(){
        Posts.Controller.createPost();
      },

      editPost: function( id ){
        Posts.Controller.editPost( id );
      }

    });

    App.addInitializer(function(){
      new Posts.Router({ controller: API });
    });

  });

});
