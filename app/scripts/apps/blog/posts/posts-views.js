// define(['handlebars','app','text!apps/blog/posts/templates/_post.html','text!apps/blog/posts/templates/postSingle.html'],function(Handlebars, App, _postTemplate, postSingle){

define(function(require){

  var Handlebars = require('handlebars');

  var App = require('app'),
      _postTemplate = require('text!apps/blog/posts/templates/_post.html'),
      postSingle = require('text!apps/blog/posts/templates/postSingle.html');

  return App.module('Blog.PostsApp', function(PostsApp){

    PostsApp.PostSingle = Marionette.ItemView.extend({
      template: Handlebars.compile( postSingle ),
      className: 'post',
      initialize: function(){
        this.modelId = this.options.modelId;
      },

      collectionEvents: {
        'add': 'setModel'
      },

      setModel: function(){
        this.model = this.collection.get(this.modelId);
        this.render();
      }


    });

    PostsApp.Post = Marionette.ItemView.extend({
      template: Handlebars.compile( _postTemplate ),
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

    PostsApp.Posts = Marionette.CollectionView.extend({
      itemView: PostsApp.Post,
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
