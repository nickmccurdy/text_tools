/*jslint indent: 2 */
/*jslint node: true */
/*global $ */

"use strict";

var Elements = {
  a: $("a"),
  body: $("body"),
  clear: $("#clear"),
  counts_find: $("#counts.find"),
  cutoff: $("#cutoff"),
  cutoff_down: $("#cutoff_down"),
  cutoff_up: $("#cutoff_up"),
  effect_links: $(".effects a:not(#help_panel)"),
  effects: $(".effect"),
  find_effect: $(".effect[data-effect='find']"),
  find_text: $("#find_text"),
  imgs_without_alts: $("img:not([alt])"),
  list_effect: $(".effect[data-effect='list']"),
  list_start: $("#list_start"),
  normal_effect: $(".effect[data-effect='normal']"),
  number_list: $("#number_list"),
  number_list_label: $("#number_list_label"),
  outputToInput: $("#outputToInput"),
  panel_heading: $(".panel-heading"),
  regexp_toggle: $("#regexp_toggle"),
  regexp_toggle_label: $("#regexp_toggle_label"),
  remove_list_effect: $(".effect[data-effect='remove_list']"),
  repeat_effect: $(".effect[data-effect='repeat']"),
  repetitions: $("#repetitions"),
  repetitions_down: $("#repetitions_down"),
  repetitions_up: $("#repetitions_up"),
  replace_effect: $(".effect#replace"),
  replace_text: $("#replace_text"),
  text_after: $("#text_after"),
  text_before: $("#text_before"),
  titlebar: $(".titlebar"),
  toolbar: $("#toolbar"),
  toolbar_button: $("#toolbar_button"),
  toolbar_close: $("#toolbar_close"),
  toolbar_collapse_button: $("#toolbar_collapse_button"),
  toolbar_expand_button: $("#toolbar_expand_button"),
  toolbar_titlebar_toggle: $("#toolbar_titlebar_toggle")
};
