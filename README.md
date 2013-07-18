DOCUMENTATION UNFINISHED
========================

TODO
====
- dry up copy tasks 
- wire up use of almond on build (grunt-usemin v2 will support this)
- Extend documentation

Getting Started
===============

If you'd like to develope a project using this template be sure to git clone the repo, remove the .git file, and start a new git repositiory.

1. ````git clone git@git-lab.evolvingmedia.org:sacrum.git''''
2. ````rm -rf .git''''
3. ````rename folder''''
4. ````git init or follow git-lab instructions''''

Getting Started - Advanced 
--------------------------
1.````npm install````
2.````grunt dev:server````

Getting Started - Beginner Mac OS 
---------------------------------
- do you have XCode installed?
- do you have homebrew installed?
- do you have npm (with node) installed globally?
- do you have grunt-cli installed globally?
Once you can answer yes to every item move on to 'Getting Started - Advanced'

Getting Started - Beginner Linux OS 
---------------------------------
If you are cool enough to be running a distro of Linux then you don't need me to hold your hand through this. One thins, are you using nvm? Might want to get that tho it is not a strict requirement.

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
  This task compiles all the coffee, stylus, and compass files from app and places then in a folder called ".tmp".  The task also automatically runs the ````grunt test```` command.

### grunt dev:server
  This task compiles the app and launches a server to view the project on. The task also automatically runs the ````grunt test```` command.

### grunt test
  This task compiles the app and runs the jasmine test specs written in "test/spec/" via a headless server, phantom.

### grunt test:server
  This tasks compiles the app and runs the jasmine test specs in your default browser.

### grunt build
  This task compiles the app for a production environment including minification and requirejs optmization and places the files in a folder called "dist".  All the static files have a unqiue hash added to their names - this allows for infinite caching on the browser. The "usemin" task in the Gruntfile should automatically replace references to the new static file names in the index.html and main.css files.  The task also automatically runs the ````grunt test```` command.

### grunt build:server
  This task compiles the app for a production environment and creates a server for you to via the built project in your browser. The task also automatically runs the ````grunt test```` command.

Sacrum's Structure
==================

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
  The .tmp folder is constructed by the builder when running the developer and testing tasks. This folder is not tracked in the git repo.

### app/
  The app folder is where you writing all your application code.  The builder only has one opinion on the folder topography of this directory.  The "app" folder must contain the index.html file in an assets, namely "app/assets/". you should also organize all your static assets in a reasonable way within this folder - images, fonts, etc. 

### dist/
  The dist folder is where the built app is placed. This folder can be rsync'ed to the server where this app is hosted.  A bash script "deploy.sh" has been added to this project to template what your rsync script might look like. This folder is not tracked in the git repo.

### node_modules/
  The node_modules folder contains all the node modules used by the builder (grunt).  This folder and its contents are added once you run ````npm install''''.  This folder is not tracked in the git repo.
  
### test/
  The test folder

### vendor/

Packages and Libraries Used
===========================

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
