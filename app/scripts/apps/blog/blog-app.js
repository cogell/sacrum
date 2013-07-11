define(function(require){

  var App = require('app');
  // require('apps/blog/header/header-app');
  // require('apps/blog/posts/posts-app');

  //////////////////////////////
  // TESTING PRIMATIVE MODULE //
  require('apps/blog/header-refactor/header-refactor');
  require('apps/blog/posts-refactor/posts-refactor');

  return App.module('blog',function(Blog){

    Blog.on('start', function(){
      // Blog.HeaderApp.start();
      // Blog.PostsApp.start();
    });

  });
});
