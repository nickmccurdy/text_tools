/*jslint indent: 2 */
/*global $, Elements, View, Helpers */

"use strict";

var Effects = {

  normal: function (input) {
    return input;
  },

  lowercase: function (input) {
    return input.toLowerCase();
  },

  uppercase: function (input) {
    return input.toUpperCase();
  },

  htmllower: function (input) {
    return Helpers.htmlCaseChanger(input, false);
  },

  htmlupper: function (input) {
    return Helpers.htmlCaseChanger(input, true);
  },

  titlecase: function (input) {
    return Helpers.toTitleCase(input.toLowerCase());
  },

  find: function (input) {
    return input.replace(View.getQuery(), Elements.find_text.val().toUpperCase());
  },

  replace: function (input) {
    return input.replace(View.getQuery(), Elements.replace_text.val());
  },

  list: function (input) {
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
      result = Helpers.modifyAsList(input, function(list) {
        return list.map(function (line) {
          return start_text + line;
        });
      });
    }
    return result;
  },

  remove_list: function (input) {
    var text_array = input.split("\n");
    text_array.forEach(function (value, i) {
      text_array[i] = value.substring(Elements.cutoff.val());
    });
    return text_array.join("\n");
  },

  repeat: function (input) {
    return new Array(parseInt(Elements.repetitions.text(), 10) + 1).join(input);
  },

  wordcount: function (input) {
    var lines = input.split("\n").length,
      occurences = {
        chars: input.length,
        lines: lines,
        words: input === "" ? 0 : input.split(" ").length + lines - 1
      };
    return "Characters: " + occurences.chars + "\nWords: " + occurences.words + "\nLines: " + occurences.lines;
  },

  sortaz: function (input) {
    return Helpers.modifyAsList(input, function (input_array) {
      return input_array.sort();
    });
  },

  sortza: function (input) {
    return Helpers.modifyAsList(input, function (input_array) {
      return input_array.sort().reverse();
    });
  },

  sortreverse: function (input) {
    return Helpers.modifyAsList(input, function (input_array) {
      return input_array.reverse();
    });
  },

  sortrandom: function (input) {
    return Helpers.modifyAsList(input, function (input_array) {
      return input_array.sort(function () {
        return 0.5 - Math.random();
      });
    });
  },

  // Borrowed from http://phpjs.org/functions/str_rot13/
  rot13: function (input) {
    return input.replace(/[a-z]/gi, function (s) {
      return String.fromCharCode(s.charCodeAt(0) + (s.toLowerCase() < "n" ? 13 : -13));
    });
  },

  backwards: function (input) {
    return input.split("").reverse().join("");
  }

};
