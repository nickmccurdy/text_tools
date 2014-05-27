"use strict";

var _s = _.string;

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
    return _s.titleize(input.toLowerCase());
  },

  find: function (input) {
    return input.replace(View.getQuery(), Elements.$find_text.val().toUpperCase());
  },

  replace: function (input) {
    return input.replace(View.getQuery(), Elements.$replace_text.val());
  },

  list: function (input) {
    var start_text = Elements.$list_start.val();

    return Helpers.modifyAsList(input, function (list) {
      var newList;

      if (Elements.$number_list.attr("checked")) {
        newList = list.map(function (line, index) {
          return (index + 1).toString() + start_text + line;
        });
      } else {
        newList = list.map(function (line) {
          return start_text + line;
        });
      }

      return newList;
    });
  },

  remove_list: function (input) {
    var text_array = _s.lines(input);
    text_array.forEach(function (value, i) {
      text_array[i] = value.substring(Elements.$cutoff.val());
    });
    return text_array.join("\n");
  },

  repeat: function (input) {
    return _s.repeat(input, parseInt(Elements.$repetitions.text(), 10));
  },

  wordcount: function (input) {
    var occurences = {
      chars: input.length,
      lines: _s.lines(input).length,
      words: _s.words(input).length
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
    return _s.reverse(input);
  }

};
