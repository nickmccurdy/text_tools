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
    Elements.$textBefore.val(Elements.$textAfter.val());
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
    Elements.$textBefore.val('');
    Elements.$textAfter.val('');
    Elements.$findText.val('');
    Elements.$replaceText.val('');
    Elements.$listStart.val('- ');
    Elements.$cutoff.val('3');
    Elements.$repetitions.val('1');
    Elements.$numberList.attr('checked', false);
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
    var query = Elements.$findText.val();
    if (Elements.$regexpToggle.attr('checked', true)) {
      // Replace the String with a RegExp to make it case-insensitive.
      query = new RegExp(query, 'gi');
    }
    return query;
  },

  // Triggers a conversion of the current input to a new output, based on the
  // current effect and options. Chainable.
  convert: function () {
    var input = Elements.$textBefore.val(),
      output = Effects[View.effect](input),
      allowAutoSelect = ['find', 'replace', 'list', 'remove_list', 'repeat'].indexOf(View.effect) === -1;

    // Update the counter for the Find effect.
    if (Elements.$findText.val() !== '') {
      Elements.$countsFind.html(' (' + input.split(View.getQuery()).length - 1 + ')');
    } else {
      Elements.$countsFind.html('');
    }

    // Update the output field.
    Elements.$textAfter.val(output);

    // Output autoselect exclusion.
    if (View.last.focused === Elements.$textAfter && !allowAutoSelect) {
      Elements.$textAfter.selectAll();
    }

    //console.log(watcherName+'watcher activated');

    return View;
  }

};

// Startup scripts for Text Tools, mostly involving event binding.
$(function () {
  // Initialization
  View.updateFocus(Elements.$textBefore);
  Elements.$normalEffect.click();
  Panels.init();
  Elements.$textBefore.focus();
  View.convert();

  // Start daemon scripts
  Elements.$body.bind('change keydown keyup paste cut', View.convert);
  Elements.$a.focus(View.regainFocus());
  Elements.$textBefore.focus(View.updateFocus(Elements.$textBefore));
  Elements.$textAfter.focus(View.updateFocus(Elements.$textAfter));
  Elements.$textAfter.click(function () {
    Elements.$textAfter.selectAll();
  });
  Elements.$imgsWithoutAlts.attr('alt', '');

  // Effect switching
  Elements.$effects.click(function () {
    var newEffect = $(this).attr('data-effect');
    View.toEffect(newEffect);
    Elements.$effects.removeClass('active');
    $(this).addClass('active');
    View.convert();
  });

  // Panel toggling
  Elements.$panelHeading.click(function () {
    var toToggle = $(this).attr('data-toggle'),
      rightObject = $(this).find('.toggle-icon');

    $('#' + toToggle).toggle();
    rightObject.swapClasses('glyphicon-chevron-down', 'glyphicon-chevron-up');
    Panels.getHidden();
  });

  // Toolbar
  Elements.$toolbarCollapseButton.click(function () {
    Panels.toggle(false);
  });
  Elements.$toolbarExpandButton.click(function () {
    Panels.toggle(true);
  });
  Elements.$toolbarTitlebarToggle.click(function () {
    Elements.$titlebar.toggle();
    Panels.getHidden();
  });

  // More click events
  Elements.$outputToInput.click(View.outputToInput);
  Elements.$clear.click(View.clear);
  Elements.$clear.focus(Elements.$textBefore.focus);
  Elements.$findEffect.click(Elements.$findText.focus);
  Elements.$replaceEffect.click(Elements.$replaceText.focus);
  Elements.$regexpToggle.click(View.convert);
  Elements.$regexpToggle.focus(function () {
    if (View.effect !== 'replace') {
      View.toEffect('find');
      Elements.$findEffect.click();
    }
  });
  Elements.$regexpToggleLabel.click(function () {
    View.convert();
    Elements.$regexpToggle.toggleCheck();
  });
  Elements.$regexpToggleLabel.focus(function () {
    if (View.effect !== 'replace') {
      View.toEffect('find');
    }
    Elements.$findEffect.click();
  });
  Elements.$numberList.click(function () {
    View.convert();
    Elements.$listStart.selectAll();
  });
  Elements.$numberList.focus(function () {
    View.toEffect('list');
    Elements.$listEffect.click();
  });
  Elements.$numberListLabel.click(function () {
    Elements.$numberList.toggleCheck(Elements.$numberList);
    View.toEffect('list');
    Elements.$listStart.selectAll();
    Elements.$listEffect.click();
    View.convert();
  });
  Elements.$cutoff.focus(function () {
    View.toEffect('remove_list');
    Elements.$cutoff.selectAll();
    Elements.$removeListEffect.click();
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
    Elements.$repeatEffect.click();
  });
  Elements.$repetitions.blur(function () {
    if (Elements.$repetitions.val() === '') {
      Elements.$repetitions.val(1);
    }
  });
  Elements.$repetitions.keyup(function () {
    $(this).numbersOnly();
  });

  Elements.$findText.focus(function () {
    if (View.effect !== 'replace') {
      View.toEffect('find');
      Elements.$replaceEffect.click();
    }
  });
  Elements.$replaceText.focus(function () {
    View.toEffect('replace');
    Elements.$replaceEffect.click();
  });
  Elements.$listEffect.focus(function () {
    Elements.$listStart.selectAll();
  });
  Elements.$listStart.focus(function () {
    View.toEffect('list');
    Elements.$listStart.selectAll();
    Elements.$listEffect.click();
  });
  Elements.$removeListEffect.focus(function () {
    Elements.$cutoff.selectAll();
  });
  Elements.$repeatEffect.focus(function () {
    Elements.$repetitions.selectAll();
  });
});
