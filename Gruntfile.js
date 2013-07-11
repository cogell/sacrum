'use strict';

var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;

var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};


module.exports = function (grunt){

  // LOAD ALL GRUNT TASK LIBS
	// require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  require('matchdep').filterDev('grunt-*').forEach(function(str){
    if (str !== 'grunt-template-jasmine-requirejs' ){  // if you dont do this it'll complain about loading up the template
      grunt.loadNpmTasks(str);
    }
  });

	// CONFIGURABLE PATHS
  var sacrumConfig = {
      app: 'app',
      dist: 'dist'
    };

  grunt.initConfig({
    sacrum: sacrumConfig,

    // WATCH THESE FILES WITH THESE TASKS //
    watch:{
      compass: {
        files: ['<%= sacrum.app %>/styles/**/*.scss'],
        tasks: ['compass:dev']
      },
      livereload: {
        files: [
          '<%= sacrum.app %>/*.html',
          '{.tmp,<%= sacrum.app %>}/styles/*.css',
          '<%= sacrum.app %>/scripts/**/*.js',
          '<%= sacrum.app %>/images/*.{png,jpg,jepg,gif,webp,svg}'
        ],
        tasks: ['livereload']
      },
      jasmine: {
        files: ['<%= sacrum.app %>/scripts/**/*.js', 'test/spec/**/*.js'],
        tasks: ['test']
      }
    },

    connect: {
      options: {
        port: 9001,
        hostname: 'localhost'
      },
      livereload: {
        options: {
          middleware: function (connect) {
            return [
              lrSnippet,
              mountFolder(connect, '.tmp'),
              // mountFolder(connect, '<%= sacrum.app %>')
              mountFolder(connect, 'app')
            ];
          }
        }
      },
      test: {
        options: {
          port: 9000
        }
      }
    },

    // OPENS UP YOUR DEFAULT BROSWER WITH A NEW PAGE AT THIS PATH
    open: {
      server: {
        path: 'http://localhost:<%= connect.options.port %>'
      }
    },

    // DESTROYS CERTAIN FOLDERS
    clean: {
      server: '.tmp',
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= sacrum.dist %>/*',
            '<%= sacrum.dist %>/.git*' // dont know if this is necessary
          ]
        }]
      }
    },

    // LINT ALL FILES
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',

      ]
    },

    // COMPILE COMPASS FILES
    compass: {
      options: {
        sassDir: '<%= sacrum.app %>/styles',
        relativeAssets: true,
        debugInfo: false,
        specify: ['<%= sacrum.app %>/styles/main.scss']
      },
      dev: {
        options: {
          cssDir: '.tmp/styles'
        }
      },
      dist: {
        options: {
          cssDir: '<%= sacrum.dist %>/styles'
        }
      }
    },

    // RUNS JASMINE SPECS IN HEADLESS PHANTOM
    jasmine: {
      test: {
        // source of all the javascripts files to test (the app's files)
        src: ['app/scripts/**/*.js', '!app/scripts/vendor/**'],
        options: {
          // test from this ad hoc server // phantomjs always times out
          // host: 'http://localhost:<%= connect.test.options.port %>',
          host: 'http://localhost:9000',
          verbose: true,

          // all the testing specs
          specs: 'test/spec/**/*Spec.js',
          helpers: ['test/spec/helpers/**/*.js', 'test/lib/jasmine-jquery.js'],
          // option to keep _SpecRunner.html
          keepRunner: true,

          template: require('grunt-template-jasmine-requirejs'),
          templateOptions: {
            requireConfigFile: 'app/scripts/requireConfig.js',
            requireConfig : {
              baseUrl: 'app/scripts/'
            }
          }
        }
      }
    }

    // //////////
    // COMEBACK AND ADD REQUIRE JS ONCE YOU WANT TO DISTRIBUTE SOMETHING
    // //////////

    // This task adds M5-Hash to the start of all targeted files
    // use this task in conjuction with usemin to src new file names
    // //////////
    // COMEBACK AND ADD REV
    // //////////
    // //////////
    // COMEBACK AND ADD USEMIN FOR REV
    // //////////
    // //////////
    // COMEBACK AND ADD IMAGE MIN
    // //////////
    // //////////
    // COMEBACK AND ADD HTML MIN
    // //////////

  });

  grunt.registerTask('server',[
    'clean:server',
    'compass:dev',
    'livereload-start',
    'connect:livereload',
    'open:server',
    'test',
    'watch'
  ]);

  grunt.registerTask('test',[
    // ADD JS LINT CHECK SOMEWHERE
    'connect:test',
    'jasmine:test'
  ]);

};
