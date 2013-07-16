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
          port: 9000,
          hostname: 'localhost',
          middleware: function (connect) {
            return [
              lrSnippet,
              mountFolder(connect, '.tmp'),
              mountFolder(connect, 'dist'),  // breaks sacrumConfig if changed
            ];
          }
        }
      },
      test: {
        options: {
          port: 9001,
          // middleware: function (connect) { return [ mountFolder(connect, '.tmp') ];}
        }
      },
      testBrowser: {
        options: {
          port: 9002,
          middleware: function (connect) {
            return [
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
      tmp: {
        files: [{
          dot: true,
          src: [
            '.tmp'
          ]
        }]
      },
      dist: {
        files: [{
          dot: true,
          src: [
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
          src: '<%= sacrum.app %>/scripts/**/*.coffee',
          dest: '.tmp/scripts',
          ext: '.js'
        }]
      },
      dist: {
        files: [{
          expand: true, // about expand option: http://gruntjs.com/configuring-tasks#building-the-files-object-dynamically
          src: '<%= sacrum.app %>/scripts/**/*.coffee',
          dest: 'dist/scripts',
          ext: '.js'
        }]
      }
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

    // COPY FILES FOR TESTING, DEVING AND BUILDING

    copy: {
      app2tmp: {
        files: [{
          expand: true, dot: true,
          cwd: 'app',
          dest: '.tmp',
          src: [
            'assets/**',
            'scripts/**/*.js',
            'styles/**/*.css',
            'index.html'
          ]
        }]
      },
      app2dist: {
        files: [{
          expand: true, dot: true,
          cwd: 'app',
          dest: '<%= sacrum.dist %>',
          src: [
            'assets/**',
            'scripts/**/*.js',
            'styles/**/*.css',
            'index.html'
          ]
        }]
      },
      vendor2tmp: {
        files: [
          {
            expand: true, dot: true, flatten: true,
            cwd: 'vendor',
            src: 'scripts/**/*.js',
            dest: '.tmp/scripts/vendor'
          },
          {
            expand: true, dot: true, flatten: true,
            cwd: 'vendor',
            src: 'styles/**/*.css',
            dest: '.tmp/styles/vendor'
          }
        ]
      },
      vendor2dist: {
        files: [
          {
            expand: true, dot: true, flatten: true,
            cwd: 'vendor',
            src: 'scripts/**/*.js',
            dest: '<%= sacrum.dist %>/scripts/vendor'
          },
          {
            expand: true, dot: true, flatten: true,
            cwd: 'vendor',
            src: 'styles/**/*.css',
            dest: '<%= sacrum.dist %>/styles/vendor'
          }
        ]
      }
    },

    // RUNS JASMINE SPECS IN HEADLESS PHANTOM
    jasmine: {
      test: {
        // source of all the javascripts files to test (the app's files)
        src: ['.tmp/scripts/**/*.js', '!.tmp/scripts/vendor/**'],
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
            requireConfigFile: '.tmp/scripts/requireConfig.js',
            requireConfig : {
              baseUrl: '.tmp/scripts/'
            }
          }
        }
      }
    },


    // USEMIN updates index.html file with optimized/minified file names
    useminPrepare: {
      html: '<%= sacrum.app %>/index.html',
      options: {
        dest: '<%= sacrum.dist %>'
      }
    },
    usemin: {
      html: '<%= sacrum.dist %>/**/*.html',
      options: {
        dirs: ['<%= sacrum.dist %>']
      }
    },

    // ////////// //
    // REQUIRE JS //
    // ////////// //

    requirejs: {
      dist: {
        options: {
          baseUrl: '<%= sacrum.dist %>/scripts',
          optimize: 'uglify',
          preserveLicenseComments: true,
          useStrict: false,
          wrap: true,
          mainConfigFile: '<%= sacrum.dist %>/scripts/requireConfig.js',
          removeCombined: true,
          findNestedDependencies: true,
          name: 'main',
          out: '<%= sacrum.dist %>/scripts/main.optimized.js',
          waitSeconds: 7,
          logLevel: 0
        }
      }
    },


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

    // RUN TASKS CONCURRENTLY
    concurrent: {
      devCompile: {
        tasks: [
          'stylus:dev',
          'coffee:dev',
          'compass:dev'
        ]
      },
      devCopy: {
        tasks: [
          'copy:app2tmp',
          'copy:vendor2tmp'
        ]
      },
      distCompile: {
        tasks: [
          'stylus:dist',
          'coffee:dist',
          'compass:dist'
        ]
      },
      distCopy: {
        tasks: [
          'copy:app2dist',
          'copy:vendor2dist'
        ]
      }
    }

  });

  grunt.registerTask('server',[
    'clean:dist',
    'clean:tmp',
    'concurrent:devCompile',
    'concurrent:devCopy',
    'livereload-start',
    'connect:livereload',
    'open:server',
    'test',
    'watch'
  ]);

  grunt.registerTask('build',[
    'clean:dist',               // clear previous build
    'concurrent:distCompile',   // compile all files
    'concurrent:distCopy',      // copy all targeted files to sacrum.dist
    'useminPrepare',
    'test',                     // run all tests
    'requirejs:dist',           // run require optimization
    'usemin'
                                // image compression
                                // clear out unwanted folders left over from optimization
  ]);

  // CREATE A SERVER BUILD TASK

  // This task runs starts up a server and
  // runs all the tests specs written in the test folder
  grunt.registerTask('test',[
    // ADD JS LINT CHECK SOMEWHERE
    'concurrent:devCopy',
    'connect:test',
    'jasmine:test'
  ]);

  // sometimes you want console log an object from a test spec
  // and play with it in the browser console
  grunt.registerTask('test:browser',[
    // ADD JS LINT CHECK SOMEWHERE
    'jasmine:test:build',
    'livereload-start',
    'connect:testBrowser',
    'open:testBrowser',
    'watch'
  ]);

};
