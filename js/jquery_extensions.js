'use strict';

// Extensions for jQuery elements. This is similar to adding to Node.prototype,
// but for jQuery.
$.fn.extend({
  // Toggles the state of a checkbox element.
  toggleCheck: function () {
    this.checked = !this.checked;
  },

  // Increases the numerical value of an element by one.
  valueUp: function () {
    this.val(parseInt(this.val(), 10) + 1);
  },

  // Decreases the numerical value of an element by one.
  valueDown: function () {
    this.val(parseInt(this.val(), 10) - 1);
    if (parseInt(this.val(), 10) < 0) {
      this.val('0');
    }
  },

  // Removes all characters except digits from the value of an element.
  numbersOnly: function () {
    this.val(this.val().replace(/\D/g, ''));
  },

  // Swaps an element between having two different CSS classes. If only class1
  // or class2 is already on the element, it is removed and the other is added.
  // Otherwise, only the first class is added. This is useful for styling
  // elements that toggle between two states.
  swapClasses: function (class1, class2) {
    if (this.hasClass(class1) || this.hasClass(class2)) {
      this.toggleClass(class1 + ' ' + class2);
    } else {
      this.addClass(class1);
    }
  },

  // Focuses an element and selects all of its contents.
  selectAll: function () {
    this.focus();
    this.select();
  }
});
