'use strict';

// Controls the display of effect panels, along with utilities for loading and
// saving the state of the panels.
var Panels = {

  // The IDs for all toggleable panels.
  allPanels: ['case_panel', 'find_panel', 'sort_panel', 'list_panel', 'other_panel', 'help_panel'],

  // The IDs for all toggleable elements (including panels).
  allElements: ['titlebar', 'case_panel', 'find_panel', 'sort_panel', 'list_panel', 'other_panel', 'help_panel'],

  // The IDs for all toggleable elements (including panels) that are hidden by
  // default.
  hiddenElements: ['case_panel', 'find_panel', 'sort_panel', 'list_panel', 'other_panel', 'help_panel'],

  // Saves the list of currently hidden panels to a cookie. Chainable.
  getHidden: function () {
    Panels.hiddenElements.length = 0;
    Panels.allElements.forEach(function (el) {
      if ($('#' + el).is(':hidden')) {
        Panels.hiddenElements.push(el);
      }
    });
    Cookies.set('tt_hidden', Panels.hiddenElements.toString());
    return Panels;
  },

  // Loads open panels from the hidden panels cookie, collapsing and expanding
  // them as appropriate. Chainable.
  init: function () {
    var hiddenElementsCookie = Cookies.get('tt_hidden');
    if (hiddenElementsCookie) {
      Panels.hiddenElements = hiddenElementsCookie.split(',');
    }
    Panels.hiddenElements.forEach(function (value) {
      $('#' + value).hide();
    });
    return Panels;
  },

  // If visible is true, all panels are expanded. Otherwise, all panels are
  // collapsed. Chainable.
  toggle: function (visible) {
    Panels.allPanels.forEach(function (panel) {
      $('#' + panel).toggle(visible);
    });
    Panels.getHidden();
    return Panels;
  }

};

/*
var openPanel = function(panelName) {
  if(last.panel) {
    toggle(last.panel)
  };
  toggle(panelName);
  last.panel = panelName;
};
*/
