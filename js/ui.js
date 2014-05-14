/*jslint indent: 2 */
/*jslint node: true */
/*global  $ */

/*global Elements, Panels, View */

"use strict";

function toggleCheck(element) {
  element.checked = !element.checked;
}

//plus and minus buttons
function valueUp(variable) {
  variable.value = parseInt(variable.value, 10) + 1;
}

function valueDown(variable) {
  variable.value = parseInt(variable.value, 10) - 1;
  if (parseInt(variable.value, 10) < 0) {
    variable.value = "0";
  }
}

//numbers only
function numbersOnly(obj) {
  obj.value = obj.value.replace(/\D/, "");
}

//USER INTERFACE
$(function () {
  //initialization
  View.updateFocus(Elements.text_before);
  Elements.normal_effect.click();
  Panels.init();
  Elements.text_before.focus();
  View.convertAll();

  //start daemon scripts
  Elements.body.bind("change keydown keyup paste cut", function () {
    View.convertAll();
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
    View.convertAll();
  });

  //panel toggling
  Elements.panel_heading.click(function () {
    var to_toggle = $(this).attr("data-toggle"),
      right_object = $(this).find(".pull-right");

    $("#" + to_toggle).slideToggle();

    if (right_object.hasClass("glyphicon-plus-sign")) {
      right_object.removeClass("glyphicon-plus-sign");
      right_object.addClass("glyphicon-minus-sign");
    } else if (right_object.hasClass("glyphicon-minus-sign")) {
      right_object.removeClass("glyphicon-minus-sign");
      right_object.addClass("glyphicon-plus-sign");
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
    View.convertAll();
  });
  Elements.regexp_toggle.focus(function () {
    if (View.effect !== 'replace') {
      View.toEffect('find');
      Elements.find_effect.click();
    }
  });
  Elements.regexp_toggle_label.click(function () {
    View.convertAll();
    View.toggleCheck(Elements.regexp_toggle);
  });
  Elements.regexp_toggle_label.focus(function () {
    if (View.effect !== 'replace') {
      View.toEffect('find');
    }
    Elements.find_effect.click();
  });
  Elements.number_list.click(function () {
    View.convertAll();
    View.selectAll(Elements.list_start);
  });
  Elements.number_list.focus(function () {
    View.toEffect('list');
    Elements.list_effect.click();
  });
  Elements.number_list_label.click(function () {
    View.toggleCheck(Elements.number_list).toEffect('list').selectAll(Elements.list_start);
    Elements.list_effect.click();
    View.convertAll();
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
    numbersOnly(this);
  });
  Elements.cutoff_up.click(function () {
    valueUp(Elements.cutoff);
    View.toEffect('remove_list').selectAll(Elements.cutoff);
    Elements.remove_list_effect.click();
  });
  Elements.cutoff_down.click(function () {
    valueDown(Elements.cutoff);
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
    numbersOnly(this);
  });
  Elements.repetitions_up.click(function () {
    valueUp(Elements.repetitions);
    View.toEffect('repeat').selectAll(Elements.repetitions);
    Elements.repeat_effect.click();
  });
  Elements.repetitions_down.click(function () {
    valueDown(Elements.repetitions);
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
