/*jslint indent: 2 */
/*jslint node: true */
/*global Effects, Elements */

"use strict";

var View = {

  effect: "normal", //change this to a different effect to bug test it on startup

  last: {
    focused: [],
    panel: []
  },

  watched: {
    input: undefined,
    find: undefined,
    replace: undefined,
    list_start: undefined,
    repetitions: undefined,
    cutoff: undefined
  },

  selectAll: function (field) {
    field.focus();
    field.select();
    return View;
  },

  outputToInput: function () {
    Elements.text_before.val(Elements.text_after.val());
    return View;
  },

  toEffect: function (change) {
    View.effect = change;
    View.convert();
    return View;
  },

  clear: function () {
    Elements.text_before.val("");
    Elements.text_after.val("");
    Elements.find_text.val("");
    Elements.replace_text.val("");
    Elements.list_start.val("- ");
    Elements.cutoff.val("3");
    Elements.repetitions.val("1");
    Elements.number_list.attr("checked", false);
    return View;
  },

  updateFocus: function (newFocus) {
    View.last.focused = newFocus;
    return View;
  },

  regainFocus: function () {
    View.last.focused.focus();
    return View;
  },

  getQuery: function () {
    var query = Elements.find_text.val();
    if (Elements.regexp_toggle.attr("checked", true)) {
      query = new RegExp(query, "gi");
    }
    return query;
  },

  convert: function (variable, element) {
    if (variable !== element) {
      variable = element;

      var input = Elements.text_before.val(),
        output = Effects[View.effect].execute(input),
        allow_auto_select = ["find", "replace", "list", "remove_list", "repeat"].indexOf(View.effect) === -1;

      if (Elements.find_text.val() !== "") {
        Elements.counts_find.html(" (" + input.split(View.getQuery()).length - 1 + ")");
      } else {
        Elements.counts_find.html("");
      }

      Elements.text_after.val(output);

      //output autoselect exclusion
      if (View.last.focused === Elements.text_after && !allow_auto_select) {
        View.selectAll(Elements.text_after);
      }

      //console.log(watcherName+"watcher activated");
    }
    return View;
  },

  convertAll: function () { //input watcher
    if (View.watched.input !== Elements.text_before) {
      View.convert();
      //console.log("main watcher activated");
    }
    View.convert(View.watched.find, Elements.find_text, "find").convert(View.watched.replace, Elements.replace_text, "replace").convert(View.watched.list_start, Elements.list_start, "list_start").convert(View.watched.repetitions, Elements.repetitions, "repetitions").convert(View.watched.cutoff, Elements.cutoff, "cutoff"); //buggy
  }

};
