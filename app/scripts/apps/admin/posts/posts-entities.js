define(['app'], function(App){

  return App.module('Admin.Posts', function(Posts){

    Posts.PostItem = Backbone.Model.extend({
      defaults: {
        'body': 'placeholder body text',
        'excerpt': 'placeholder excerpt text',
        'published': false,
        'title': 'placeholder title'
      }
    });

    Posts.PostsCollection = Backbone.Collection.extend({
      model: Posts.PostItem,
      url: 'http://localhost:3000/api/posts'
    });

  });

});
