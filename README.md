DOCUMENTATION UNFINISHED
========================

TODO
====
- dry up copy tasks 
- wire up use of almond on build (grunt-usemin v2 will support this)
- Extend documentation

Getting Started - Advanced 
--------------------------
````npm install````
````grunt dev:server````

Getting Started - Beginner Mac OS 
---------------------------------
- do you have XCode installed?
- do you have homebrew installed?
- do you have npm (with node) installed globally?
- do you have grunt-cli installed globally?
Once you can answer yes to every item move on to 'Getting Started - Advanced'

Getting Started - Beginner Linux OS 
---------------------------------
If you are cool enough to be running a distro of Linux then you don't need me to hold your hand through this. One thins, are you using nvm? Might want to get that.

Grunt Tasks
-----------
````grunt dev````
````grunt dev:server````
````grunt test````
````grunt test:server````
````grunt build````
````grunt build:server````

All of the grunt tasks are run in the terminal when you are sitting at the root of the project's dirctory.

### grunt dev
  This tasks compiles all the coffee, stylus, and compass files from app and places then in a folder called .tmp.  The task also automatically runs the ````grunt test```` command.



Main File
---------
The main file is located at the root, named Gruntfile.js.

Directory Structure
-------------------
.tmp/
app/
dist/
node_modules/
test/
vendor/


### .tmp/
This folder is constructed by the builder when running the developer and testing tasks.

app/
dist/
node_modules/
test/
vendor/

JavaScript Libraries
--------------------
- jQuery 1.10.2
- jQuery 2.0.3
- Underscore 1.4.4
- Backbone 1.0.0
- Backbone.Marionette 1.0.3
- Handlebars 1.0.0
- Handlebars.Runtime 1.0.0
- RequireJS 2.1.8
- RequireJS.Text 2.0.7
- Almond 0.2.5

Node Modules
------------
- grunt
- grunt-concurrent
- grunt-contrib-clean
- grunt-contrib-coffee
- grunt-contrib-compass
- grunt-contrib-connect
- grunt-contrib-copy
- grunt-contrib-cssmin
- grunt-contrib-handlebars
- grunt-contrib-htmlmin
- grunt-contrib-imagemin
- grunt-contrib-jasmine
- grunt-contrib-jshint
- grunt-contrib-livereload
- grunt-contrib-requirejs
- grunt-contrib-stylus
- grunt-contrib-uglify
- grunt-contrib-watch
- grunt-open
- grunt-rev
- grunt-template-jasmine-requirejs
- grunt-usemin
- matchdep
