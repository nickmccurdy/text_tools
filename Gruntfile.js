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
        globalstrict: true
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
