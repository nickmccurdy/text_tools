'use strict';

var _s = _.string;

// A collection of all of Text Tools's text effects. This is a key/value mapping
// from the names of effects (used for data-effect in the HTML) to functions
// that run the appropriate effects. An effect function is always passed a
// String with the contents of the input field, and always returns a String that
// the output should be set to display.
var Effects = {

  // A no-op that returns the unmodified input.
  normal: function (input) {
    return input;
  },

  // Lowercases the input.
  lowercase: function (input) {
    return input.toLowerCase();
  },

  // Uppercases the input.
  uppercase: function (input) {
    return input.toUpperCase();
  },

  // Lowercases HTML tags within the input.
  htmllower: function (input) {
    return Helpers.htmlCaseChanger(input, false);
  },

  // Uppercases HTML tags within the input.
  htmlupper: function (input) {
    return Helpers.htmlCaseChanger(input, true);
  },

  // Titlecases the input.
  titlecase: function (input) {
    return _s.titleize(input.toLowerCase());
  },

  // Finds a String or RegExp within the input and capitalizes it.
  find: function (input) {
    return input.replace(View.getQuery(), Elements.$find_text.val().toUpperCase());
  },

  // Finds a String or RegExp within the input and replaces it with another
  // String.
  replace: function (input) {
    return input.replace(View.getQuery(), Elements.$replace_text.val());
  },

  // Adds ordered or unordered list text to the beginning of every line of input
  // text.
  list: function (input) {
    var start_text = Elements.$list_start.val();

    return Helpers.modifyAsList(input, function (list) {
      var newList;

      if (Elements.$number_list.attr('checked')) {
        // ordered list
        newList = list.map(function (line, index) {
          return (index + 1).toString() + start_text + line;
        });
      } else {
        // unordered list
        newList = list.map(function (line) {
          return start_text + line;
        });
      }

      return newList;
    });
  },

  // Removes a given number of characters from the beginning of every line.
  // Useful for removing plain text lists.
  remove_list: function (input) {
    var text_array = _s.lines(input);
    text_array.forEach(function (value, i) {
      text_array[i] = value.substring(Elements.$cutoff.val());
    });
    return text_array.join('\n');
  },

  // Repeats the input String a given number of times.
  repeat: function (input) {
    return _s.repeat(input, parseInt(Elements.$repetitions.text(), 10));
  },

  // Counts the number of characters, lines, and words in the input text and
  // displays the results. Similar to wc on *nix.
  wordcount: function (input) {
    var occurences = {
      chars: input.length,
      lines: _s.lines(input).length,
      words: _s.words(input).length
    };
    return 'Characters: ' + occurences.chars + '\nWords: ' + occurences.words + '\nLines: ' + occurences.lines;
  },

  // Sorts input lines alphabetically.
  sortaz: function (input) {
    return Helpers.modifyAsList(input, function (input_array) {
      return input_array.sort();
    });
  },

  // Sorts input lines in reverse alphabetical order.
  sortza: function (input) {
    return Helpers.modifyAsList(input, function (input_array) {
      return input_array.sort().reverse();
    });
  },

  // Sorts input lines in reverse order.
  sortreverse: function (input) {
    return Helpers.modifyAsList(input, function (input_array) {
      return input_array.reverse();
    });
  },

  // Sorts input lines randomly. Every time the output is updated, a different
  // random ordering is used.
  sortrandom: function (input) {
    return Helpers.modifyAsList(input, function (input_array) {
      return input_array.sort(function () {
        return 0.5 - Math.random();
      });
    });
  },

  // Applies rot13 encryption/decryption to the input text.
  // Borrowed from http://phpjs.org/functions/str_rot13/.
  rot13: function (input) {
    return input.replace(/[a-z]/gi, function (s) {
      return String.fromCharCode(s.charCodeAt(0) + (s.toLowerCase() < 'n' ? 13 : -13));
    });
  },

  // Displays the input backwards (character by character). Similar to tac on
  // *nix.
  backwards: function (input) {
    return _s.reverse(input);
  }

};
