describe('the header module', function(){

  // scoped to all specs
  // loading in archor for header into the dom
  // start the header module --> this should make it attach to the dom
  beforeEach(function(){
    $('body').append('<div id="header-region">PLACEHOLDER HEADER TEXT</div>');
  });

  it('expect app to be defined', function(){
    expect(typeof(app)).toBe('object');
  });

  // it 'the header should be sitting in the DOM, check for an element with class of Ipsum'
  it('adds its view into the correct region with a class name of "header"', function(){
    expect().toHaveClass('')
  });

});
