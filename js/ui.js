/*jslint indent: 2 */
/*jslint node: true */
/*global  $ */

/*global Panels, View, ViewHelper, Watcher */

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
  nav_header: $(".nav-header"),
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
  titlebar: $("#titlebar"),
  toolbar: $("#toolbar"),
  toolbar_button: $("#toolbar_button"),
  toolbar_close: $("#toolbar_close"),
  toolbar_collapse_button: $("#toolbar_collapse_button"),
  toolbar_expand_button: $("#toolbar_expand_button"),
  toolbar_titlebar_toggle: $("#toolbar_titlebar_toggle")
};

//USER INTERFACE
$(function () {
  //initialization
  View.updateFocus(Elements.text_before);
  Elements.normal_effect.click();
  Panels.init();
  Elements.text_before.focus();
  Watcher.convertAll();

  //start daemon scripts
  Elements.body.bind("change keydown keyup paste cut", function () {
    Watcher.convertAll();
  });
  Elements.a.focus(View.regainFocus());
  Elements.text_before.focus(View.updateFocus(Elements.text_before));
  Elements.text_after.focus(View.updateFocus(Elements.text_after));
  Elements.text_after.click(function () {
    View.selectAll(Elements.text_after);
  });
  Elements.imgs_without_alts.attr("alt", "");

  //effect switching
  Elements.effects.click(function () {
    var new_effect = $(this).attr("data-effect");
    View.toEffect(new_effect);
    Elements.effects.removeClass("active");
    $(this).addClass("active");
    Watcher.convertAll();
  });

  //panel toggling
  Elements.nav_header.click(function () {
    var to_toggle = $(this).attr("data-toggle"),
      right_object = $(this).find(".pull-right");

    $("#" + to_toggle).slideToggle();

    if (right_object.hasClass("icon-plus-sign")) {
      right_object.removeClass("icon-plus-sign");
      right_object.addClass("icon-minus-sign");
    } else if (right_object.hasClass("icon-minus-sign")) {
      right_object.removeClass("icon-minus-sign");
      right_object.addClass("icon-plus-sign");
    }

    Panels.getHidden();
  });

  //toolbar
  Elements.toolbar_button.click(function () {
    Elements.toolbar.slideToggle();
    Panels.getHidden();
  });
  Elements.toolbar_close.click(function () {
    Elements.toolbar.slideUp();
    Panels.getHidden();
  });
  Elements.toolbar_collapse_button.click(function () {
    Panels.toggle(false);
  });
  Elements.toolbar_expand_button.click(function () {
    Panels.toggle(true);
  });
  Elements.toolbar_titlebar_toggle.click(function () {
    Elements.titlebar.toggle();
    Panels.getHidden();
  });

  //more click events
  Elements.outputToInput.click(function () {
    View.outputToInput();
  });
  Elements.clear.click(function () {
    View.clear();
  });
  Elements.clear.focus(function () {
    Elements.text_before.focus();
  });
  Elements.find_effect.click(function () {
    Elements.find_text.focus();
  });
  Elements.replace_effect.click(function () {
    Elements.replace_text.focus();
  });
  Elements.regexp_toggle.click(function () {
    Watcher.convertAll();
  });
  Elements.regexp_toggle.focus(function () {
    if (View.effect !== 'replace') {
      View.toEffect('find');
      Elements.find_effect.click();
    }
  });
  Elements.regexp_toggle_label.click(function () {
    Watcher.convertAll();
    View.toggleCheck(Elements.regexp_toggle);
  });
  Elements.regexp_toggle_label.focus(function () {
    if (View.effect !== 'replace') {
      View.toEffect('find');
    }
    Elements.find_effect.click();
  });
  Elements.number_list.click(function () {
    Watcher.convertAll();
    View.selectAll(Elements.list_start);
  });
  Elements.number_list.focus(function () {
    View.toEffect('list');
    Elements.list_effect.click();
  });
  Elements.number_list_label.click(function () {
    View.toggleCheck(Elements.number_list).toEffect('list').selectAll(Elements.list_start);
    Elements.list_effect.click();
    Watcher.convertAll();
  });
  Elements.cutoff.focus(function () {
    View.toEffect('remove_list').selectAll(Elements.cutoff);
    Elements.remove_list_effect.click();
  });
  Elements.cutoff.blur(function () {
    if (Elements.cutoff.val() === '') {
      Elements.cutoff.val(3);
    }
  });
  Elements.cutoff.keyup(function () {
    ViewHelper.numbersOnly(this);
  });
  Elements.cutoff_up.click(function () {
    ViewHelper.valueUp(Elements.cutoff);
    View.toEffect('remove_list').selectAll(Elements.cutoff);
    Elements.remove_list_effect.click();
  });
  Elements.cutoff_down.click(function () {
    ViewHelper.valueDown(Elements.cutoff);
    View.toEffect('remove_list').selectAll(Elements.cutoff);
    Elements.remove_list_effect.click();
  });
  Elements.repetitions.focus(function () {
    View.toEffect('repeat').selectAll(Elements.repetitions);
    Elements.repeat_effect.click();
  });
  Elements.repetitions.blur(function () {
    if (Elements.repetitions.val() === '') {
      Elements.repetitions.val(1);
    }
  });
  Elements.repetitions.keyup(function () {
    ViewHelper.numbersOnly(this);
  });
  Elements.repetitions_up.click(function () {
    ViewHelper.valueUp(Elements.repetitions);
    View.toEffect('repeat').selectAll(Elements.repetitions);
    Elements.repeat_effect.click();
  });
  Elements.repetitions_down.click(function () {
    ViewHelper.valueDown(Elements.repetitions);
    View.toEffect('repeat').selectAll(Elements.repetitions);
    Elements.repeat_effect.click();
  });

  Elements.find_text.focus(function () {
    if (View.effect !== 'replace') {
      View.toEffect('find');
      Elements.replace_effect.click();
    }
  });
  Elements.replace_text.focus(function () {
    View.toEffect('replace');
    Elements.replace_effect.click();
  });
  Elements.list_effect.focus(function () {
    View.selectAll(Elements.list_start);
  });
  Elements.list_start.focus(function () {
    View.toEffect('list').selectAll(Elements.list_start);
    Elements.list_effect.click();
  });
  Elements.remove_list_effect.focus(function () {
    View.selectAll(Elements.cutoff);
  });
  Elements.repeat_effect.focus(function () {
    View.selectAll(Elements.repetitions);
  });
});
