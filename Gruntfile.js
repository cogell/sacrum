'use strict';

var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;

var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};


module.exports = function (grunt){

  // LOAD ALL GRUNT TASK LIBS
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
          '<%= sacrum.app %>/assets/*.html',
          '{.tmp,<%= sacrum.app %>}/styles/*.css',
          '<%= sacrum.app %>/scripts/**/*.js',
          '<%= sacrum.app %>/images/*.{png,jpg,jepg,gif,webp,svg}'
        ],
        tasks: ['livereload']
      },
      jasmine: {
        files: ['<%= sacrum.app %>/scripts/**/*.js', 'test/spec/**/*.js'],
        tasks: ['test']
      },
      // dummy task to keep the server running on build:server
      build: {
        files: ['<%= sacrum.app %>/*.html']
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
              mountFolder(connect, '.tmp')
            ];
          }
        }
      },
      build: {
        options: {
          port: 9000,
          hostname: 'localhost',
          middleware: function (connect) {
            return [
              lrSnippet,
              // mountFolder(connect, '<%= sacrum.dist %>')
              mountFolder(connect, 'dist')
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
      tmp: '.tmp',
      dist: '<%= sacrum.dist %>',
      postBuild: [
        '<%= sacrum.dist %>/js/vendor',
        '<%= sacrum.dist %>/js/primatives',
        '<%= sacrum.dist %>/js/templates',
        '<%= sacrum.dist %>/css/vendor'
      ]
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
          '.tmp/css/main.css' : ['<%= sacrum.app %>/styles/**/*.styl']
        }
      },
      dist: {
        options: {
          compress: true,
          linenos: false
        },
        files: {
          'dist/css/main.css' : ['<%= sacrum.app %>/styles/**/*.styl']
        }
      }
    },

    // COMPILE COFFEE FILES
    coffee: {
      options: {
        bare: true
      },
      dev: {
        files: [{
          expand: true, // about expand option: http://gruntjs.com/configuring-tasks#building-the-files-object-dynamically
          src: '<%= sacrum.app %>/scripts/**/*.coffee',
          dest: '.tmp/css',
          ext: '.js'
        }]
      },
      dist: {
        files: [{
          expand: true, // about expand option: http://gruntjs.com/configuring-tasks#building-the-files-object-dynamically
          src: '<%= sacrum.app %>/scripts/**/*.coffee',
          dest: 'dist/css',
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
          cssDir: '.tmp/css'
        }
      },
      dist: {
        options: {
          cssDir: '<%= sacrum.dist %>/css'
        }
      }
    },

    // COPY FILES FOR TESTING, DEVING AND BUILDING
    // DRY THIS UP WITH SOME ARGS AND GRUNT REG TASK //
    copy: {
      // DEVELOPMENT
      assets2tmp: {
        files: [{
          expand: true, dot: true,
          cwd: 'app/assets/',
          dest: '.tmp',
          src: '**'
        }]
      },
      scripts2tmp: {
        files: [{
          expand: true, dot: true,
          cwd: 'app',
          dest: '.tmp/js/',
          src: '**/*.js'
        }]
      },
      styles2tmp: {
        files: [{
          expand: true, dot: true,
          cwd: 'app/styles',
          dest: '.tmp/css/',
          src: '**/*.css'
        }]
      },
      vendor2tmp: {
        files: [
          {
            expand: true, dot: true, flatten: true,
            cwd: 'vendor',
            src: 'js/require*.js',
            dest: '.tmp/js/'
          },
          {
            expand: true, dot: true, flatten: true,
            cwd: 'vendor',
            src: 'js/**/*.js',
            dest: '.tmp/js/vendor'
          },
          {
            expand: true, dot: true, flatten: true,
            cwd: 'vendor',
            src: 'css/**/*.css',
            dest: '.tmp/css/vendor'
          }
        ]
      },
      // BUILD
      assets2dist: {
        files: [{
          expand: true, dot: true,
          cwd: 'app/assets/',
          dest: 'dist',
          src: '**'
        }]
      },
      scripts2dist: {
        files: [{
          expand: true, dot: true,
          cwd: 'app',
          dest: 'dist/js/',
          src: '**/*.js'
        }]
      },
      styles2dist: {
        files: [{
          expand: true, dot: true,
          cwd: 'app/styles',
          dest: 'dist/css/',
          src: '**/*.css'
        }]
      },
      vendor2dist: {
        files: [
          {
            expand: true, dot: true, flatten: true,
            cwd: 'vendor',
            src: 'js/require*.js',
            dest: 'dist/js/'
          },
          {
            expand: true, dot: true, flatten: true,
            cwd: 'vendor',
            src: 'js/almond*.js',
            dest: 'dist/js/'
          },
          {
            expand: true, dot: true, flatten: true,
            cwd: 'vendor',
            src: 'js/**/*.js',
            dest: 'dist/js/vendor'
          },
          {
            expand: true, dot: true, flatten: true,
            cwd: 'vendor',
            src: 'css/**/*.css',
            dest: 'dist/css/vendor'
          }
        ]
      }
    },

    // RUNS JASMINE SPECS IN HEADLESS PHANTOM
    jasmine: {
      test: {
        // source of all the javascripts files to test (the app's files)
        src: ['.tmp/js/**/*.js', '!.tmp/js/vendor/**'],
        options: {
          // test from this ad hoc server // phantomjs always times out
          host: 'http://localhost:<%= connect.test.options.port %>',
          // host: 'http://localhost:9000',
          junitPath: './',

          // all the testing specs
          specs: 'test/spec/**/*Spec.js',
          helpers: ['test/helpers/**/*.js', 'test/lib/jasmine-jquery.js'],
          // option to keep _SpecRunner.html
          keepRunner: false,

          template: require('grunt-template-jasmine-requirejs'),
          templateOptions: {
            requireConfigFile: '.tmp/js/requireConfig.js',
            requireConfig : {
              baseUrl: '.tmp/js/'
            }
          }
        }
      }
    },


    // USEMIN updates index.html file with optimized/minified file names
    // v2 should support the ability to wire up almond on build
    useminPrepare: {
      html: '<%= sacrum.app %>/index.html',
      css: '<%= sacrum.app %>/css/main.css',
      options: {
        dest: '<%= sacrum.dist %>'
      }
    },
    usemin: {
      html: ['<%= sacrum.dist %>/index.html'],
      css: ['<%= sacrum.dist %>/css/main.css'],
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
          baseUrl: '<%= sacrum.dist %>/js',
          optimize: 'uglify',
          preserveLicenseComments: true,
          useStrict: false,
          wrap: true,
        mainConfigFile: '<%= sacrum.dist %>/js/requireConfig.js',
          removeCombined: true,
          findNestedDependencies: true,
          name: 'main',
          out: '<%= sacrum.dist %>/js/main.optimized.js',
          waitSeconds: 7,
          logLevel: 0
        }
      }
    },

    // This task adds unqiue content hash to the start of all targeted files
    // use this task in conjuction with usemin to src new file names
    // NOT CONFIGURED
    rev: {
      options: {
        encoding: 'utf8',
        algorithm: 'sha1',
        length: 4
      },
      files: {
        src: [
          '<%= sacrum.dist %>/**/*.{js,css,png,jpg}'
        ]
      }
    },

    // //////////
    // COMEBACK AND ADD IMAGE MIN
    // //////////

    handlebars: {
      dev: {
        options: {
          // namespace: 'JST', // this is the default
          amd: true            // dont really know how this works yet :)
        },
        files: [{
          expand: true,
          flatten: true,
          cwd: 'app/',
          src: ['**/*.hbs'],
          dest: '.tmp/js/templates/',
          ext: '.js'
        }]
      },
      dist: {
        options: {
          // namespace: 'JST', // this is the default
          amd: true            // dont really know how this works yet :)
        },
        files: [{
          expand: true,
          flatten: true,
          cwd: 'app/',
          src: ['**/*.hbs'],
          dest: '<%= sacrum.dist %>/js/templates/',
          ext: '.js'
        }]
      }
    },

    // RUN TASKS CONCURRENTLY
    concurrent: {
      devCompile: {
        tasks: [
          'stylus:dev',
          'coffee:dev',
          'compass:dev',
          'handlebars:dev'
        ]
      },
      devCopy: {
        tasks: [
          'copy:assets2tmp',
          'copy:scripts2tmp',
          'copy:styles2tmp',
          'copy:vendor2tmp'
        ]
      },
      distCompile: {
        tasks: [
          'stylus:dist',
          'coffee:dist',
          'compass:dist',
          'handlebars:dev'
        ]
      },
      distCopy: {
        tasks: [
          'copy:assets2dist',
          'copy:scripts2dist',
          'copy:styles2dist',
          'copy:vendor2dist'
        ]
      }
    }

  });

  grunt.registerTask('dev',[
    'clean:tmp',
    'concurrent:devCompile',
    'concurrent:devCopy',
    'test',
  ]);

  grunt.registerTask('dev:server',[
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
    'rev',
    'usemin',
                                // image compression
    'clean:postBuild'           // clear out unwanted folders left over from optimization
  ]);

  // CREATE A SERVER BUILD TASK

  grunt.registerTask('build:server',[
    'build',

    'livereload-start',
    'connect:build',
    'open:server',
    'watch:build'
  ]);

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
  grunt.registerTask('test:server',[
    // ADD JS LINT CHECK SOMEWHERE
    'concurrent:devCopy',
    'jasmine:test:build',
    'livereload-start',
    'connect:testBrowser',
    'open:testBrowser',
    'watch'
  ]);

};
