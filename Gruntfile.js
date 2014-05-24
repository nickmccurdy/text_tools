module.exports = function (grunt) {
  grunt.loadNpmTasks("grunt-contrib-csslint");
  grunt.loadNpmTasks("grunt-jslint");

  grunt.initConfig({
    jslint: {
      src: "js/*.js"
    },
    csslint: {
      src: "*.css",
      options: {
        "adjoining-classes": false
      }
    }
  });

  grunt.registerTask("default", ["jslint", "csslint"]);
};
