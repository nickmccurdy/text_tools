module.exports = function (grunt) {
  grunt.loadNpmTasks("grunt-contrib-csslint");
  grunt.loadNpmTasks("grunt-contrib-jshint");

  grunt.initConfig({
   jshint: {
      files: "js/*.js",
      options: {
        globals: {
          $: false,
          _: false
        },
        indent: 2,
        node: true,
        nomen: true,
        regexp: true
      }
    },
    csslint: {
      files: "*.css",
      options: {
        "adjoining-classes": false
      }
    }
  });

  grunt.registerTask("default", ["jshint", "csslint"]);
};
