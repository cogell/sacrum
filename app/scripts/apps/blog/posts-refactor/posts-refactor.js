define(function(require){

  var Handlebars = require('handlebars');
  var App = require('app');

  var ListShowSeed = require('primatives/modules/ListShow');
  var _post = require('text!apps/blog/posts-refactor/templates/_post.html');

  App.module("Blog.PostsRefactor", ListShowSeed);

  return App.module('Blog.PostsRefactor', function(PostsRefactor){

      ///////////////////
     // CONFIGURATION //
    ///////////////////

    // Configure router with label
    PostsRefactor.myRouteLabel = 'post';

    // Configure module regions
    PostsRefactor.listRegion = App.postsRegion;
    PostsRefactor.showRegion = App.postRegion;


      ///////////////
     // EXTENSION //
    ///////////////

    // extend the module collection to have correct url
    PostsRefactor.Collection = PostsRefactor.Collection.extend({
      url: 'http://localhost:3000/api/posts'
    });

    // extend item view
    PostsRefactor.ItemView = PostsRefactor.ItemView.extend({
      template: Handlebars.compile( _post ),
      className: 'post',
      events: {
        'click': 'routeToPost'
      },
      routeToPost: function(){
        Backbone.history.navigate(('posts/' + this.model.id), {trigger: true});
      },
      onBeforeClose: function(){
        this.$el.fadeOut();
      },
      onRender: function(){
        this.$el.hide();
        this.$el.fadeIn();
        // this.getImage();
      },
      getImage: function(){
        $.ajax({
          url: this.model.get('photo'),
          done: function(){
            console.log('finished ajax call');
          }
        });
      },
      remove: function(){
        this.$el.fadeOut(function(){
          $(this).remove();
        });
      }

    });

    // extend collection view
    PostsRefactor.CollectionView = PostsRefactor.CollectionView.extend({
      itemView:  PostsRefactor.ItemView, // Update with new extended itemview
      className: 'posts',
      events:{
        'click .post': 'closeAnimation'
      },
      closeAnimation: function(){
        this.children.each(function(view){
          view.remove();
        });
      }
    });

  });

});
