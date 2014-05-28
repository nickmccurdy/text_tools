'use strict';

// A collection of the main view helpers for Text Tools. This also stores some
// information about the current state of the view.
var View = {

  // The ID of the currently enabled effect. This should match the name of a
  // function in Effects. Change this to a different effect to bug test it on
  // startup.
  effect: 'normal',

  // Information about recently used elements. Used primarily for refocusing UI
  // elements after effect settings are changed.
  last: {
    focused: [],
    panel: []
  },

  // Replaces the value of the input with the value of the output. This is
  // useful for "saving" effects so that multiple can be chained together.
  // Chainable.
  outputToInput: function () {
    Elements.$text_before.val(Elements.$text_after.val());
    return View;
  },

  // Changes the a given effect (by ID) and updates the output. Chainable.
  toEffect: function (change) {
    View.effect = change;
    View.convert();
    return View;
  },

  // Resets all input fields to the default values. Chainable.
  clear: function () {
    Elements.$text_before.val('');
    Elements.$text_after.val('');
    Elements.$find_text.val('');
    Elements.$replace_text.val('');
    Elements.$list_start.val('- ');
    Elements.$cutoff.val('3');
    Elements.$repetitions.val('1');
    Elements.$number_list.attr('checked', false);
    return View;
  },

  // A hack that saves information that the given element is now focused.
  // Chainable.
  updateFocus: function (newFocus) {
    View.last.focused = newFocus;
    return View;
  },

  // Focuses on the last focused element that is also whitelisted to regain the
  // focus. Chainable.
  regainFocus: function () {
    View.last.focused.focus();
    return View;
  },

  // Returns the search query for the "Find" or "Find and Replace" effects. If a
  // RegExp is given by the user, that is used. Otherwise, the String input is
  // converted to a case-insensitive RegExp.
  getQuery: function () {
    var query = Elements.$find_text.val();
    if (Elements.$regexp_toggle.attr('checked', true)) {
      query = new RegExp(query, 'gi');
    }
    return query;
  },

  // Triggers a conversion of the current input to a new output, based on the
  // current effect and options. Chainable.
  convert: function () {
    var input = Elements.$text_before.val(),
      output = Effects[View.effect](input),
      allow_auto_select = ['find', 'replace', 'list', 'remove_list', 'repeat'].indexOf(View.effect) === -1;

    if (Elements.$find_text.val() !== '') {
      Elements.$counts_find.html(' (' + input.split(View.getQuery()).length - 1 + ')');
    } else {
      Elements.$counts_find.html('');
    }

    Elements.$text_after.val(output);

    //output autoselect exclusion
    if (View.last.focused === Elements.$text_after && !allow_auto_select) {
      Elements.$text_after.selectAll();
    }

    //console.log(watcherName+'watcher activated');

    return View;
  }

};

// Startup scripts for Text Tools, mostly involving event binding.
$(function () {
  //initialization
  View.updateFocus(Elements.$text_before);
  Elements.$normal_effect.click();
  Panels.init();
  Elements.$text_before.focus();
  View.convert();

  //start daemon scripts
  Elements.$body.bind('change keydown keyup paste cut', View.convert);
  Elements.$a.focus(View.regainFocus());
  Elements.$text_before.focus(View.updateFocus(Elements.$text_before));
  Elements.$text_after.focus(View.updateFocus(Elements.$text_after));
  Elements.$text_after.click(function () {
    Elements.$text_after.selectAll();
  });
  Elements.$imgs_without_alts.attr('alt', '');

  //effect switching
  Elements.$effects.click(function () {
    var new_effect = $(this).attr('data-effect');
    View.toEffect(new_effect);
    Elements.$effects.removeClass('active');
    $(this).addClass('active');
    View.convert();
  });

  //panel toggling
  Elements.$panel_heading.click(function () {
    var to_toggle = $(this).attr('data-toggle'),
      right_object = $(this).find('.toggle-icon');

    $('#' + to_toggle).toggle();
    right_object.swapClasses('glyphicon-chevron-down', 'glyphicon-chevron-up');
    Panels.getHidden();
  });

  //toolbar
  Elements.$toolbar_collapse_button.click(function () {
    Panels.toggle(false);
  });
  Elements.$toolbar_expand_button.click(function () {
    Panels.toggle(true);
  });
  Elements.$toolbar_titlebar_toggle.click(function () {
    Elements.$titlebar.toggle();
    Panels.getHidden();
  });

  //more click events
  Elements.$outputToInput.click(View.outputToInput);
  Elements.$clear.click(View.clear);
  Elements.$clear.focus(Elements.$text_before.focus);
  Elements.$find_effect.click(Elements.$find_text.focus);
  Elements.$replace_effect.click(Elements.$replace_text.focus);
  Elements.$regexp_toggle.click(View.convert);
  Elements.$regexp_toggle.focus(function () {
    if (View.effect !== 'replace') {
      View.toEffect('find');
      Elements.$find_effect.click();
    }
  });
  Elements.$regexp_toggle_label.click(function () {
    View.convert();
    Elements.$regexp_toggle.toggleCheck();
  });
  Elements.$regexp_toggle_label.focus(function () {
    if (View.effect !== 'replace') {
      View.toEffect('find');
    }
    Elements.$find_effect.click();
  });
  Elements.$number_list.click(function () {
    View.convert();
    Elements.$list_start.selectAll();
  });
  Elements.$number_list.focus(function () {
    View.toEffect('list');
    Elements.$list_effect.click();
  });
  Elements.$number_list_label.click(function () {
    Elements.$number_list.toggleCheck(Elements.$number_list);
    View.toEffect('list');
    Elements.$list_start.selectAll();
    Elements.$list_effect.click();
    View.convert();
  });
  Elements.$cutoff.focus(function () {
    View.toEffect('remove_list');
    Elements.$cutoff.selectAll();
    Elements.$remove_list_effect.click();
  });
  Elements.$cutoff.blur(function () {
    if (Elements.$cutoff.val() === '') {
      Elements.$cutoff.val(3);
    }
  });
  Elements.$cutoff.keyup(function () {
    this.numbersOnly();
  });
  Elements.$repetitions.focus(function () {
    View.toEffect('repeat');
    Elements.$repetitions.selectAll();
    Elements.$repeat_effect.click();
  });
  Elements.$repetitions.blur(function () {
    if (Elements.$repetitions.val() === '') {
      Elements.$repetitions.val(1);
    }
  });
  Elements.$repetitions.keyup(function () {
    $(this).numbersOnly();
  });

  Elements.$find_text.focus(function () {
    if (View.effect !== 'replace') {
      View.toEffect('find');
      Elements.$replace_effect.click();
    }
  });
  Elements.$replace_text.focus(function () {
    View.toEffect('replace');
    Elements.$replace_effect.click();
  });
  Elements.$list_effect.focus(function () {
    Elements.$list_start.selectAll();
  });
  Elements.$list_start.focus(function () {
    View.toEffect('list');
    Elements.$list_start.selectAll();
    Elements.$list_effect.click();
  });
  Elements.$remove_list_effect.focus(function () {
    Elements.$cutoff.selectAll();
  });
  Elements.$repeat_effect.focus(function () {
    Elements.$repetitions.selectAll();
  });
});
