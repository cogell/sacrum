require(['requireConfig'],function(){

  require(
    ['app',
    'apps/blog/blog-app',
    'apps/admin/admin-app'
    ],
    function(App){
    App.start();
  });

});
