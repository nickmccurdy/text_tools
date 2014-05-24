module.exports = function (grunt) {
  grunt.loadNpmTasks("grunt-contrib-csslint");
  grunt.loadNpmTasks("grunt-jslint");

  grunt.initConfig({
    jslint: {
      build: {
        src: "js/*.js",
        directives: {
          predef: ["$", "_"],
          indent: 2,
          node: true,
          nomen: true,
          regexp: true
        }
      }
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
