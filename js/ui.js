/*jslint indent: 2 */
/*jslint node: true */
/*global $, Elements, Panels, View */

"use strict";

$.fn.extend({
  toggleCheck: function () {
    this.checked = !this.checked;
  },

  //plus and minus buttons
  valueUp: function () {
    this.val(parseInt(this.val(), 10) + 1);
  },

  valueDown: function () {
    this.val(parseInt(this.val(), 10) - 1);
    if (parseInt(this.val(), 10) < 0) {
      this.val("0");
    }
  },

  //numbers only
  numbersOnly: function () {
    this.val(this.val().replace(/\D/g, ""));
  },

  swapClasses: function (class1, class2) {
    if (this.hasClass(class1) || this.hasClass(class2)) {
      this.toggleClass(class1 + " " + class2);
    } else {
      this.addClass(class1);
    }
  }
});

//USER INTERFACE
$(function () {
  //initialization
  View.updateFocus(Elements.text_before);
  Elements.normal_effect.click();
  Panels.init();
  Elements.text_before.focus();
  View.convertAll();

  //start daemon scripts
  Elements.body.bind("change keydown keyup paste cut", View.convertAll);
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
      right_object = $(this).find(".toggle-icon");

    $("#" + to_toggle).toggle();
    right_object.swapClasses("glyphicon-chevron-down", "glyphicon-chevron-up");
    Panels.getHidden();
  });

  //toolbar
  Elements.toolbar_button.click(function () {
    Elements.toolbar.show();
    Panels.getHidden();
  });
  Elements.toolbar_close.click(function () {
    Elements.toolbar.hide();
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
  Elements.outputToInput.click(View.outputToInput);
  Elements.clear.click(View.clear);
  Elements.clear.focus(Elements.text_before.focus);
  Elements.find_effect.click(Elements.find_text.focus);
  Elements.replace_effect.click(Elements.replace_text.focus);
  Elements.regexp_toggle.click(View.convertAll);
  Elements.regexp_toggle.focus(function () {
    if (View.effect !== 'replace') {
      View.toEffect('find');
      Elements.find_effect.click();
    }
  });
  Elements.regexp_toggle_label.click(function () {
    View.convertAll();
    UI.toggleCheck(Elements.regexp_toggle);
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
    UI.toggleCheck(Elements.number_list).toEffect('list').selectAll(Elements.list_start);
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
    UI.numbersOnly(this);
  });
  Elements.cutoff_up.click(function () {
    UI.valueUp(Elements.cutoff);
    View.toEffect('remove_list').selectAll(Elements.cutoff);
    Elements.remove_list_effect.click();
  });
  Elements.cutoff_down.click(function () {
    UI.valueDown(Elements.cutoff);
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
    UI.numbersOnly(this);
  });
  Elements.repetitions_up.click(function () {
    UI.valueUp(Elements.repetitions);
    View.toEffect('repeat').selectAll(Elements.repetitions);
    Elements.repeat_effect.click();
  });
  Elements.repetitions_down.click(function () {
    UI.valueDown(Elements.repetitions);
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
