define(['app', 'apps/admin/posts/posts-views', 'apps/admin/posts/posts-entities'],function(App){

  return App.module('Admin.Posts', function(Posts){

    Posts.Controller = ({

      listPosts: function(){
        // clear single post editing or creating, postRegion.close()
        App.postRegion.close();
        // create a new collection from the server
        var c = new Posts.PostsCollection();
        c.fetch();
        // create a new collection view
        var v = new Posts.Posts({ collection: c });
        // show new view in region, postsRegion.show( v )
        App.postsRegion.show( v );
      },

      createPosts: function(){

      },

      editPost: function( id ){
        // clear posts list (or hide with animation)
        App.postsRegion.close();
        // get the collection - refactor to check for an existing collection
        var c = new Posts.PostsCollection();
        c.fetch();
        var v = new Posts.PostEdit({ collection: c, modelId: id });
        App.postRegion.show( v );
      }

    });

  });

});
