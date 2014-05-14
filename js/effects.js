/*jslint indent: 2 */
/*jslint node: true */
/*global  $ */

/*global Elements, View, Helpers */

"use strict";

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
      return Helpers.htmlCaseChanger(input, "lower");
    }
  },

  htmlupper: {
    execute: function (input) {
      return Helpers.htmlCaseChanger(input, "upper");
    }
  },

  titlecase: {
    execute: function (input) {
      return Helpers.toTitleCase(input.toLowerCase());
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
        content_array.forEach(function () { //act sequentially on all array items
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
      text_array.forEach(function (value, i) {
        text_array[i] = value.substring(View.watched.cutoff);
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
      var lines = input.split("\n").length,
        occurences = {
          chars: input.length,
          lines: lines,
          words: input === "" ? 0 : input.split(" ").length + lines - 1
        };
      return "Characters: " + occurences.chars + "\nWords: " + occurences.words + "\nLines: " + occurences.lines;
    }
  },

  sortaz: {
    execute: function (input) {
      return Helpers.modifyAsList(input, function (input_array) {
        return input_array.sort();
      });
    }
  },

  sortza: {
    execute: function (input) {
      return Helpers.modifyAsList(input, function (input_array) {
        return input_array.sort().reverse();
      });
    }
  },

  sortreverse: {
    execute: function (input) {
      return Helpers.modifyAsList(input, function (input_array) {
        return input_array.reverse();
      });
    }
  },

  sortrandom: {
    execute: function (input) {
      return Helpers.modifyAsList(input, function (input_array) {
        return input_array.sort(function () {
          return 0.5 - Math.random();
        });
      });
    }
  },

  rot13: {
    // Borrowed from http://phpjs.org/functions/str_rot13/
    execute: function (input) {
      return input.replace(/[a-z]/gi, function (s) {
        return String.fromCharCode(s.charCodeAt(0) + (s.toLowerCase() < "n" ? 13 : -13));
      });
    }
  },

  backwards: {
    execute: function (input) {
      return input.split("").reverse().join("");
    }
  }

};
