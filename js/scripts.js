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
    this.hidden_elements.length = 0;
    var counter = 0,
      i;
    $.each(Panels.all_elements, function (i, el) {
      if ($("#" + el).is(":hidden")) {
        Panels.hidden_elements.push(el);
        counter += 1;
      }
    });
    Cookies.set("tt_hidden", this.hidden_elements.toString(), 365);
    return this;
  },

  //collapse and expand all sections
  init: function () {
    var hidden_elements_cookie = Cookies.get("tt_hidden");
    if (hidden_elements_cookie) {
      this.hidden_elements = hidden_elements_cookie.split(",");
    }
    $.each(this.hidden_elements, function (i, value) {
      $("#" + value).hide();
    });
    return this;
  },

  //collapse and expand all sections
  toggle: function (visible) {
    var i,
      panel;
    for (i = 0; i < this.all_panels.length; i += 1) {
      panel = $("#" + this.all_panels[i]);
      if (visible) {
        panel.show();
      } else {
        panel.hide();
      }
    }
    this.getHidden();
    return this;
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
    return this;
  },

  outputToInput: function () {
    Elements.text_before.val(Elements.text_after.val());
    return this;
  },

  toEffect: function (change) {
    this.effect = change;
    this.convert();
    return this;
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
    return this;
  },

  updateFocus: function (newFocus) {
    this.last.focused = newFocus;
    return this;
  },

  regainFocus: function () {
    this.last.focused.focus();
    return this;
  },

  getQuery: function () {
    var query = Elements.find_text.val();
    if (Elements.regexp_toggle.attr("checked", true)) {
      query = new RegExp(query, "gi");
    }
    return query;
  },

  convert: function (variable, element, watcherName) {
    if (variable !== element) {
      variable = element;

      var input = Elements.text_before.val(),
        output = Effects[this.effect].execute(input),
        allow_auto_select = ["find", "replace", "list", "remove_list", "repeat"].indexOf(this.effect) === -1;

      if (Elements.find_text.val() !== "") {
        Elements.counts_find.html(" (" + input.split(this.getQuery()).length - 1 + ")");
      } else {
        Elements.counts_find.html("");
      }

      Elements.text_after.val(output);

      //output autoselect exclusion
      if (this.last.focused === Elements.text_after && !allow_auto_select) {
        View.selectAll(Elements.text_after);
      }

      //console.log(watcherName+"watcher activated");
    }
    return this;
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
    if (this.watched.input !== Elements.text_before) {
      View.convert();
      //console.log("main watcher activated");
    }
    View.convert(this.watched.find, Elements.find_text, "find").convert(this.watched.replace, Elements.replace_text, "replace").convert(this.watched.list_start, Elements.list_start, "list_start").convert(this.watched.repetitions, Elements.repetitions, "repetitions").convert(this.watched.cutoff, Elements.cutoff, "cutoff"); //buggy
  }

};
