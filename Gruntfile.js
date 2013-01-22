/*jshint node: true */

module.exports = function (grunt) {

  'use strict';

  [
    'grunt-contrib-jst',
    'grunt-contrib-less',
    'grunt-contrib-watch'
  ].forEach(function (name) {
    grunt.loadNpmTasks(name);
  });

  grunt.initConfig({
    jst: {
      compile: {
        files: {
          'assets/js/jst.js': ['assets/js/templates/**/*.html']
        },
        options: {
          amdWrapper: true,
          processName: function (filename) {
            return filename.match(/((?:mobile|pc)\/.*).html$/)[1];
          },
          processContent: function (src) {
            return src.replace(/(^\s+|\s+$)/gm, '');
          }
        }
      }
    },

    watch: {
      jst: {
        files: ['assets/js/templates/**/*.html'],
        tasks: ['jst']
      },
      less: {
        files: ['assets/less/*.less'],
        tasks: ['less']
      }
    },

    less: {
      options: {
        compress: true
      }
    }
  });
};
