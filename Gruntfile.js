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
      stylus: {
        files: ['<%= sacrum.app %>/styles/**/*.styl'],
        tasks: ['stylus:dev']
      },
      coffee: {
        files: ['<%= sacrum.app %>/scripts/**/*.coffee'],
        tasks: ['coffee:dev']
      },
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
        port: 9000,
        hostname: 'localhost'
      },
      livereload: {
        options: {
          middleware: function (connect) {
            return [
              lrSnippet,
              mountFolder(connect, '.tmp'),
              mountFolder(connect, 'app')
            ];
          }
        }
      },
      test: {
        options: {
          port: 9001
        }
      },
      testBrowser: {
        options: {
          port: 9002,
          middleware: function (connect) {
            return [
              lrSnippet,
              // mountFolder(connect, '.tmp'),
              // mountFolder(connect, 'app')
              mountFolder(connect, './')
            ];
          }
        }
      }
    },

    // OPENS UP YOUR DEFAULT BROSWER WITH A NEW PAGE AT THIS PATH
    open: {
      server: {
        path: 'http://localhost:<%= connect.options.port %>'
      },
      testBrowser: {
        path: 'http://localhost:<%= connect.testBrowser.options.port %>/_SpecRunner.html'
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

    // LINT ALL FILES -- // NOT CONFIGURED //
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js'
      ]
    },

    // COMPILE STYLUS FILES
    stylus: {
      options: {},
      dev: {
        options: {
          compress: false,
          linenos: true
        },
        files: {
          '.tmp/styles/main.css' : ['<%= sacrum.app %>/styles/**/*.styl']
        }
      },
      dist: {
        options: {
          compress: true,
          linenos: false
        },
        files: {
          'dist/styles/main.css' : ['<%= sacrum.app %>/styles/**/*.styl']
        }
      }
    },

    // COMPILE COFFEE FILES
    coffee: {
      dev: {
        files: [{
          expand: true, // about expand option: http://gruntjs.com/configuring-tasks#building-the-files-object-dynamically
          // cwd: '<%= sacrum.app %>/scripts',
          src: '<%= sacrum.app %>/scripts/**/*.coffee',
          dest: '.tmp/scripts',
          ext: '.js'
        }]
      },
      dist: {}
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
          host: 'http://localhost:<%= connect.test.options.port %>',
          // host: 'http://localhost:9000',
          junitPath: './',

          // all the testing specs
          specs: 'test/spec/**/*Spec.js',
          helpers: ['test/helpers/**/*.js', 'test/lib/jasmine-jquery.js'],
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
    },

    // //////////
    // COMEBACK AND ADD REQUIRE JS ONCE YOU WANT TO DISTRIBUTE SOMETHING
    // //////////

    requirejs: {
      dist: {
        options: {
          baseUrl: 'dist/scripts',
          optimize: 'uglify',
          preserveLicenseComments: true,
          useStrict: false,
          wrap: true,
          mainConfigFile: '',
          removeCombined: false,
          findNestedDependencies: true,
          name: 'main',
          out: 'dist/scripts/main.optimized.js',
          waitSeconds: 7,
          logLevel: 0
        }
      }
    }

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

    // CONSIDER WIRING UP CONCURRENT TASKS TO SAVE ON COMPILE TIME

    // UP CONCURRENT TASKS TO SAVE ON COMPILE TIME

  });

  grunt.registerTask('server',[
    'clean:server',
    'stylus:dev',
    'coffee:dev',
    'compass:dev',
    'livereload-start',
    'connect:livereload',
    'open:server',
    'test',
    'watch'
  ]);

  grunt.registerTask('build',[
    'clean:dist'        // clear previous build
    // 'coffee:dist'       // compile coffee
    // 'compass:dist'         // compile sass
    // 'stylus:dist'       // compile stylus
    // 'test'              // run all tests
    // 'requirejs:dist'    // run require optimization
                           // image compression
  ]);

  grunt.registerTask('test',[
    // ADD JS LINT CHECK SOMEWHERE
    'connect:test',
    'jasmine:test'
  ]);

  // sometimes you want put something in the global scope and play with it
  grunt.registerTask('test:browser',[
    // ADD JS LINT CHECK SOMEWHERE
    'jasmine:test:build',
    'livereload-start',
    'connect:testBrowser',
    'open:testBrowser',
    'watch'
  ]);

};
