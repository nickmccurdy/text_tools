module.exports = function (grunt) {
  grunt.loadNpmTasks("grunt-contrib-csslint");
  grunt.loadNpmTasks("grunt-contrib-jshint");

  grunt.initConfig({
    jshint: {
      files: ["js/*.js", "test/*.js", "!test/mocha.js"],
      options: {
        globals: {
          Effects: true,
          Elements: true,
          Helpers: true,
          Panels: true,
          View: true,

          // libraries
          _: false,
          Cookies: false,

          // mocha
          describe: false,
          context: false,
          it: false,
          before: false,
          beforeEach: false,
          after: false,
          afterEach: false,

          // other test libraries
          expect: false,
          sinon: false
        },
        browser: true,
        globalstrict: true,
        jquery: true
      }
    },
    csslint: {
      files: "*.css"
    }
  });

  grunt.registerTask("default", ["jshint", "csslint"]);
};
