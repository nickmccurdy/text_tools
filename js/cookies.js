/*jslint indent: 2 */
/*jslint node: true */
/*global  $ */

/*jslint browser: true */

"use strict";

var Cookies = {

  set: function (name, value, days) {
    var expires = "",
      date;
    if (days) {
      date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toGMTString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
    return this;
  },

  get: function (name) {
    var nameEQ = name + "=",
      ca = document.cookie.split(';'),
      i;

    $.each(ca, function (index, c) {
      while (c.charAt(0) === ' ') {
        c = c.substring(1, c.length);
      }
      if (c.indexOf(nameEQ) === 0) {
        return c.substring(nameEQ.length, c.length);
      }
    });

    return null;
  },

  clear: function (name) {
    Cookies.set(name, "", -1);
    return this;
  }

};
