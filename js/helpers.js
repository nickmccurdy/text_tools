/*jslint indent: 2 */
/*jslint node: true */
/*jslint regexp: true */
/*jslint nomen: true */
/*global _ */

var _s = _.string;

"use strict";

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
