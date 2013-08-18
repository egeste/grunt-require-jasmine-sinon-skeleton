BOWER_CONFIG = require('./bower.json');
PACKAGE_CONFIG = require('./package.json');

module.exports = function (grunt) {

  grunt.initConfig({
    pkg: PACKAGE_CONFIG,
    connect: {
      server: {
        options: {
          port: 9001
        }
      }
    },
    clean: {
      build: ['build', 'docs', 'src-cov']
    },
    coffee: {
      src: {
        expand: true,
        flatten: false,
        cwd: 'coffee/src/',
        src: ['**/*.coffee'],
        dest: 'src/',
        ext: '.js'
      },
      spec: {
        expand: true,
        flatten: false,
        cwd: 'coffee/spec/',
        src: ['**/*.spec.coffee'],
        dest: 'spec/',
        ext: '.spec.js'
      },
      helper: {
        expand: true,
        flatten: false,
        cwd: 'coffee/spec/',
        src: ['**/*.helper.coffee'],
        dest: 'spec/',
        ext: '.helper.js'
      }
    },
    blanket: {
      instrument: {
        files: {
          'src-cov/': ['src/']
        }
      }
    },
    jasmine: {
      live: {
        src: BOWER_CONFIG.name+'/**/*.js',
        options: {
          template: require("grunt-template-jasmine-requirejs"),
          templateOptions: {
            requireConfigFile: BOWER_CONFIG.name+'/main.js'
          },
          host: 'http://localhost:9001',
          outfile: 'specs.html',
          specs: 'spec/**/*.spec.js',
          helpers: [
            'components/sinon/lib/sinon.js',
            'components/sinon/lib/sinon/spy.js',
            'components/sinon/lib/sinon/**/*.js',
            'spec/**/*.helper.js'
          ],
          styles: [
            'lib/jscoverage/jscoverage.css'
          ],
          keepRunner: true
        }
      },
      normal: {
        src: BOWER_CONFIG.name+'/**/*.js',
        options: {
          template: require("grunt-template-jasmine-requirejs"),
          templateOptions: {
            requireConfigFile: BOWER_CONFIG.name+'/main.js'
          },
          specs: 'spec/**/*.spec.js',
          helpers: [
            'components/sinon/lib/sinon.js',
            'components/sinon/lib/sinon/spy.js',
            'components/sinon/lib/sinon/**/*.js',
            'spec/**/*.helper.js'
          ]
        }
      }
    },
    watch: {
      docs: {
        files: ['*.md'],
        tasks: ['markdown', 'concat:docs']
      },
      coffee: {
        files: ['coffee/**/*.coffee'],
        tasks: ['coffee', 'docco:coffee']
      },
      scripts: {
        files: ['src/**/*.js', 'spec/**/*.js'],
        tasks: ['jshint','blanket','jasmine:live','docco'],
        options: {
          livereload: true
        }
      }
    },
    jshint: {
      all: ['src/*.js'],
      options: {
        eqnull: true,
        boss: true,
        expr: true,
        supernew: true
      }
    },
    docco: {
      coffee: {
        src: ['coffee/**/*.coffee'],
        options: {
          output: 'docs/coffee/'
        }
      }
    },
    markdown: {
      all: {
        files: [{
          expand: true,
          src: 'README.md',
          dest: '.',
          ext: '.html'
        }]
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-markdown');
  grunt.loadNpmTasks('grunt-docco');
  grunt.loadNpmTasks('grunt-blanket');

  grunt.registerTask('default', ['clean', 'coffee','jshint','blanket','jasmine:normal','docco','markdown']);
  grunt.registerTask('live', ['clean','connect', 'coffee','jshint','blanket','jasmine:live','docco','markdown', 'watch']);
};