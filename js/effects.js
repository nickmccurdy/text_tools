/*jslint indent: 2 */
/*jslint node: true */
/*global  $ */

/*jslint regexp: true */
/*global Elements, View, Watcher */

"use strict";

var modifyAsList = function (input, callback) {
  return callback(input.split("\n")).join("\n");
};

//html upper/lower
var htmlCaseChanger = function (input, html_case_mode) {
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
    switch (html_case_mode) {
    case "lower":
      content_array[i] = content_array[i].toLowerCase();
      break;
    case "upper":
      content_array[i] = content_array[i].toUpperCase();
      break;
    }
  }
  return content_array.join(""); //set this value as blank when not bug testing
};

/*
* To Title Case 2.0.1 – http://individed.com/code/to-title-case/
* Copyright © 2008–2012 David Gouch. Licensed under the MIT License.
*/
if (typeof String.prototype.toTitleCase !== "function") {
  String.prototype.toTitleCase = function () {
    var smallWords = /^(a|an|and|as|at|but|by|en|for|if|in|of|on|or|the|to|vs?\.?|via)$/i;

    return this.replace(/([^\W_]+[^\s\-]*) */g, function (match, p1, index, title) {
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
  };
}

var Effects = {

  normal: {
    execute: function (input) {
      return input;
    }
  },

  lowercase: {
    execute: function (input) {
      return input.toLowerCase();
    }
  },

  uppercase: {
    execute: function (input) {
      return input.toUpperCase();
    }
  },

  htmllower: {
    execute: function (input) {
      return htmlCaseChanger(input, "lower");
    }
  },

  htmlupper: {
    execute: function (input) {
      return htmlCaseChanger(input, "upper");
    }
  },

  titlecase: {
    execute: function (input) {
      return input.toLowerCase().toTitleCase();
    }
  },

  find: {
    execute: function (input) {
      return input.replace(View.getQuery(), Elements.find_text.val().toUpperCase());
    }
  },

  replace: {
    execute: function (input) {
      return input.replace(View.getQuery(), Elements.replace_text.val());
    }
  },

  list: {
    execute: function (input) {
      var last_input, content_array, num, result, start_text;
      if (Elements.number_list.attr("checked")) {
        last_input = "";
        content_array = input.split("\n");
        num = 0;
        $.each(content_array, function (index, value) { //act sequentially on all array items
          num += 1;
          last_input += num + Elements.list_start.val() + content_array.shift() + "\n";
        });
        result = last_input.slice(0, last_input.length - 1);
      } else {
        start_text = Elements.list_start.val();
        result = start_text + input.replace("\n", "\n" + start_text);
      }
      return result;
    }
  },

  remove_list: {
    execute: function (input) {
      var text_array = input.split("\n");
      $.each(text_array, function (i, value) {
        text_array[i] = value.substring(Watcher.watched.cutoff);
      });
      return text_array.join("\n");
    }
  },

  repeat: {
    execute: function (input) {
      return input.repeat(parseInt(Elements.repetitions.text(), 10));
    }
  },

  wordcount: {
    execute: function (input) {
      var occurences = {
        chars: input.length,
        lines: input.split("\n").length,
        words: input === "" ? 0 : input.split(" ").length + this.lines - 1
      };
      return "Characters: " + occurences.chars + "\nWords: " + occurences.words + "\nLines: " + occurences.lines;
    }
  },

  sortaz: {
    execute: function (input) {
      return modifyAsList(input, function (input_array) {
        return input_array.sort();
      });
    }
  },

  sortza: {
    execute: function (input) {
      return modifyAsList(input, function (input_array) {
        return input_array.sort().reverse();
      });
    }
  },

  sortreverse: {
    execute: function (input) {
      return modifyAsList(input, function (input_array) {
        return input_array.reverse();
      });
    }
  },

  sortrandom: {
    execute: function (input) {
      return modifyAsList(input, function (input_array) {
        return input_array.sort(function () {
          return 0.5 - Math.random();
        });
      });
    }
  },

  rot13: {
    execute: function (input) {
      return input.replace(/[a-zA-Z]/g, function (c) {
        return String.fromCharCode((c <= "Z" ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26);
      });
    }
  },

  backwards: {
    execute: function (input) {
      return input.split("").reverse().join("");
    }
  }

};
