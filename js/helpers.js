"use strict";

var _s = _.string;

var Helpers = {

  modifyAsList: function (input, callback) {
    return callback(_s.lines(input)).join("\n");
  },

  //html upper/lower
  htmlCaseChanger: function (input, uppercase) {
    var caseFunction = uppercase ? "toUpperCase" : "toLowerCase",
      htmlTag = /(<[^<>]*>)/g;
    return input.replace(htmlTag, function (match) {
      return match[caseFunction]();
    });
  }

};
