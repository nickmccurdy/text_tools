/*jslint indent: 2 */
/*jslint node: true */
/*global $, Cookies */

"use strict";

//main variables
var Panels = {

  all_panels: ["case_panel", "find_panel", "sort_panel", "list_panel", "other_panel", "help_panel"],
  all_elements: ["titlebar", "toolbar", "case_panel", "find_panel", "sort_panel", "list_panel", "other_panel", "help_panel"],
  hidden_elements: ["toolbar", "case_panel", "find_panel", "sort_panel", "list_panel", "other_panel", "help_panel"],

  getHidden: function () {
    Panels.hidden_elements.length = 0;
    Panels.all_elements.forEach(function (el) {
      if ($("#" + el).is(":hidden")) {
        Panels.hidden_elements.push(el);
      }
    });
    Cookies.set("tt_hidden", Panels.hidden_elements.toString());
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

/*
var openPanel = function(panel_name) {
  if(last.panel) {
    toggle(last.panel)
  };
  toggle(panel_name);
  last.panel = panel_name;
};
*/
