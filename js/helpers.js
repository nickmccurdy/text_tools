'use strict';

var _s = _.string;

// A collection of helper scripts for the effects.
var Helpers = {

  // Converts a String to an Array of String lines, runs a callback, and returns
  // the result as a concatenated String.
  modifyAsList: function (input, callback) {
    return callback(_s.lines(input)).join('\n');
  },

  // Uppercases or lowercases HTML tags within a String. In other words, text
  // between <> is changed to uppercase or uppercase. Uppercase is used if
  // uppercase is true, otherwise lowercase is used.
  htmlCaseChanger: function (input, uppercase) {
    var caseFunction = uppercase ? 'toUpperCase' : 'toLowerCase',
      htmlTag = /(<[^<>]*>)/g;
    return input.replace(htmlTag, function (match) {
      return match[caseFunction]();
    });
  }

};
