define(function(require){

  var App = require('app');

  return App.module('Blog.PostsApp', function(PostsApp){

    PostsApp.PostItem = Backbone.Model.extend({
    });

    PostsApp.PostsCollection = Backbone.Collection.extend({
      model: PostsApp.PostItem,
      url: 'http://localhost:3000/api/posts'
    });

  });

});
