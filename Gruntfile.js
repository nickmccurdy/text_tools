module.exports = function (grunt) {
  grunt.loadNpmTasks("grunt-contrib-csslint");
  grunt.loadNpmTasks("grunt-contrib-jshint");

  grunt.initConfig({
    jshint: {
      files: "js/*.js",
      options: {
        globals: {
          Effects: true,
          Elements: true,
          Helpers: true,
          Panels: true,
          View: true,

          // libraries
          _: false,
          Cookies: false
        },
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
