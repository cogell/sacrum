define(['handlebars', 'app', 'text!apps/admin/posts/templates/_post.html','text!apps/admin/posts/templates/postEdit.html'], function(Handlebars,App,_postTemplate, postEditTemplate){

  return App.module('Admin.Posts', function(Posts){

    Posts.PostEdit = Marionette.ItemView.extend({
      template: Handlebars.compile( postEditTemplate ),
      className: 'edit-post',

      ///////////////////////////////////////////////////////////
      // HANDLES FINDING THE MODEL IN THE PASSED IN COLLECTION //

      initialize: function(){
        this.modelId = this.options.modelId;
      },
      collectionEvents: {
        'add': 'setModel'
      },
      setModel: function(){
        this.model = this.collection.get(this.modelId);
        this.render();
      },

      ///////////////////////////////////////////
      // HANDLES SAVING AND CANCELING THE EDIT //

      events: {
        'click .save': 'saveChanges'
      },

      saveChanges: function(){
        // console.log('savechange fired');
        console.log( this.model.get('excerpt') );
        // this.model.set('title', $('#title').val() );
        this.model.set('excerpt', $('#excerpt').val() );
        // this.model.set('body', $('#body').val() );
        console.log( this.model.get('excerpt') );

        this.model.save();

        this.routeToAllPosts();
      },

      routeToAllPosts: function(){
        Backbone.history.navigate(('admin/posts'),{trigger: true});
      }

    });

    Posts.Post = Marionette.ItemView.extend({
      template: Handlebars.compile( _postTemplate ),
      className: 'post'
    });

    Posts.Posts = Marionette.CollectionView.extend({
      itemView: Posts.Post,
      className: 'posts'
    });

  });

});
