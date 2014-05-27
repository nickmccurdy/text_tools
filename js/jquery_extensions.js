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
  },

  selectAll: function () {
    this.focus();
    this.select();
  }
});
