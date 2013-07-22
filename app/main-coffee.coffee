# mimics the main.js file

require ['requireConfig'], ->

  require ['app'], (App) ->
      App.start()
