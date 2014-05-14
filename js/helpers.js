/*jslint indent: 2 */
/*jslint node: true */
/*jslint regexp: true */

"use strict";

var Helpers = {

  modifyAsList: function (input, callback) {
    return callback(input.split("\n")).join("\n");
  },

  //html upper/lower
  htmlCaseChanger: function (input, uppercase) {
    var last_input = input,
      content_array = [],
      i,
      bracket;
    for (i = 1; i < input.split("<").length; i += 1) { //set the input into an array
      if (last_input.indexOf("<") !== -1) {
        bracket = "<";
      }
      if (last_input.indexOf(">") !== -1) {
        bracket = ">";
      }
      content_array.push(last_input.substring(0, last_input.indexOf(bracket)) + bracket);
      last_input = last_input.substring(last_input.indexOf(bracket) + 1);
    }
    content_array.push(last_input);
    for (i = 1; i < content_array.length; i += 2) { //change the case of html
      content_array[i] = content_array[i][uppercase ? "toUpperCase" : "toLowerCase"]();
    }
    return content_array.join(""); //set this value as blank when not bug testing
  },

  /*
  * To Title Case 2.0.1 – http://individed.com/code/to-title-case/
  * Copyright © 2008–2012 David Gouch. Licensed under the MIT License.
  */
  toTitleCase: function (string) {
    var smallWords = /^(a|an|and|as|at|but|by|en|for|if|in|of|on|or|the|to|vs?\.?|via)$/i;

    return string.replace(/([^\W_]+[^\s\-]*) */g, function (match, p1, index, title) {
      if (index > 0 &&
          index + p1.length !== title.length &&
          p1.search(smallWords) > -1 &&
          title.charAt(index - 2) !== ":" &&
          title.charAt(index - 1).search(/[^\s\-]/) < 0) {
        return match.toLowerCase();
      }

      if (p1.substr(1).search(/[A-Z]|\../) > -1) {
        return match;
      }

      return match.charAt(0).toUpperCase() + match.substr(1);
    });
  }

};
