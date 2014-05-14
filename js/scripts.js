/*jslint indent: 2 */
/*jslint node: true */
/*global  $ */

/*global Cookies, Effects, Elements */

"use strict";

//main variables
var Panels = {

  all_panels: ["case_panel", "find_panel", "sort_panel", "list_panel", "other_panel", "misc_panel", "help_panel"],
  all_elements: ["titlebar", "toolbar", "case_panel", "find_panel", "sort_panel", "list_panel", "other_panel", "misc_panel", "help_panel"],
  hidden_elements: ["toolbar", "case_panel", "find_panel", "sort_panel", "list_panel", "other_panel", "misc_panel", "help_panel"],

  getHidden: function () {
    Panels.hidden_elements.length = 0;
    Panels.all_elements.forEach(function (el) {
      if ($("#" + el).is(":hidden")) {
        Panels.hidden_elements.push(el);
      }
    });
    Cookies.set("tt_hidden", Panels.hidden_elements.toString(), 365);
    return Panels;
  },

  //collapse and expand all sections
  init: function () {
    var hidden_elements_cookie = Cookies.get("tt_hidden");
    if (hidden_elements_cookie) {
      Panels.hidden_elements = hidden_elements_cookie.split(",");
    }
    Panels.hidden_elements.forEach(function (value) {
      $("#" + value).hide();
    });
    return Panels;
  },

  //collapse and expand all sections
  toggle: function (visible) {
    var i,
      panel;
    for (i = 0; i < Panels.all_panels.length; i += 1) {
      panel = $("#" + Panels.all_panels[i]);
      if (visible) {
        panel.show();
      } else {
        panel.hide();
      }
    }
    Panels.getHidden();
    return Panels;
  }

};

var View = {

  effect: "normal", //change this to a different effect to bug test it on startup

  last: {
    focused: [],
    panel: []
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
  }

};

var ViewHelper = {

  toggleCheck: function (element) {
    element.checked = !element.checked;
  },

  //plus and minus buttons
  valueUp: function (variable) {
    variable.value = parseInt(variable.value, 10) + 1;
  },

  valueDown: function (variable) {
    variable.value = parseInt(variable.value, 10) - 1;
    if (parseInt(variable.value, 10) < 0) {
      variable.value = "0";
    }
  },

  //numbers only
  numbersOnly: function (obj) {
    obj.value = obj.value.replace(/\D/, "");
  }

};

/*
var openPanel = function(panel_name) {
  if(last.panel) {
    toggle(last.panel)
  };
  toggle(panel_name);
  last.panel = panel_name;
};
*/

var Watcher = {

  watched: {
    input: undefined,
    find: undefined,
    replace: undefined,
    list_start: undefined,
    repetitions: undefined,
    cutoff: undefined
  },

  convertAll: function () { //input watcher
    if (Watcher.watched.input !== Elements.text_before) {
      View.convert();
      //console.log("main watcher activated");
    }
    View.convert(Watcher.watched.find, Elements.find_text, "find").convert(Watcher.watched.replace, Elements.replace_text, "replace").convert(Watcher.watched.list_start, Elements.list_start, "list_start").convert(Watcher.watched.repetitions, Elements.repetitions, "repetitions").convert(Watcher.watched.cutoff, Elements.cutoff, "cutoff"); //buggy
  }

};
