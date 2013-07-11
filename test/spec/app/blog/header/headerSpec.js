require(['app'],function(App){

  describe('the header module', function(){

    it('should be defined', function(){
      expect(typeof(App.Blog.HeaderRefactor)).toBe('object');
    });

    it('expects app to have a header region', function(){
      expect( $(App.headerRegion.el) ).toHaveId('header-region')
    });

    // create link to the dom
    // call header show
    $('body').append('<div id="header-region">PLACEHOLDER HEADER TEXT</div>');
    App.Blog.HeaderRefactor.API.show()

    // it 'the header should be sitting in the DOM, check for an element with class of Ipsum'
    it('adds its view into the correct region with a class name of "header"', function(){
      expect( $(App.headerRegion.el).children() ).toHaveClass('header')
    });

  });
});
