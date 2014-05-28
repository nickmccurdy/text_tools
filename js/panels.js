'use strict';

// Controls the display of effect panels, along with utilities for loading and
// saving the state of the panels.
var Panels = {

  // The IDs for all toggleable panels.
  all_panels: ['case_panel', 'find_panel', 'sort_panel', 'list_panel', 'other_panel', 'help_panel'],

  // The IDs for all toggleable elements (including panels).
  all_elements: ['titlebar', 'case_panel', 'find_panel', 'sort_panel', 'list_panel', 'other_panel', 'help_panel'],

  // The IDs for all toggleable elements (including panels) that are hidden by
  // default.
  hidden_elements: ['case_panel', 'find_panel', 'sort_panel', 'list_panel', 'other_panel', 'help_panel'],

  // Saves the list of currently hidden panels to a cookie. Chainable.
  getHidden: function () {
    Panels.hidden_elements.length = 0;
    Panels.all_elements.forEach(function (el) {
      if ($('#' + el).is(':hidden')) {
        Panels.hidden_elements.push(el);
      }
    });
    Cookies.set('tt_hidden', Panels.hidden_elements.toString());
    return Panels;
  },

  // Loads open panels from the hidden panels cookie, collapsing and expanding
  // them as appropriate. Chainable.
  init: function () {
    var hidden_elements_cookie = Cookies.get('tt_hidden');
    if (hidden_elements_cookie) {
      Panels.hidden_elements = hidden_elements_cookie.split(',');
    }
    Panels.hidden_elements.forEach(function (value) {
      $('#' + value).hide();
    });
    return Panels;
  },

  // If visible is true, all panels are expanded. Otherwise, all panels are
  // collapsed. Chainable.
  toggle: function (visible) {
    Panels.all_panels.forEach(function (panel) {
      $('#' + panel).toggle(visible);
    });
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
