require(['app'], function(App){

  describe('the posts module', function(){

    it('should be defined', function(){
      expect(App.Blog.PostsRefactor).toBe('Object');
    })

    xit('to have a link to app via the postsregion and postregion', function(){
      expect(App.postsRegion)
    });

    console.info( App.postsRegion );

  })

});
