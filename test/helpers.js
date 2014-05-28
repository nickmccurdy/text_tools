'use strict';

describe('Helpers', function () {
  describe('.modifyAsList', function () {
    it('adds text to the beginning of each line of a string', function () {
      var callback = function (list) {
        return list.map(function (line) {
          return '- ' + line;
        });
      };
      expect(Helpers.modifyAsList('one\ntwo\nthree', callback))
        .to.be('- one\n- two\n- three');
    });

    it('sorts lines in a string', function () {
      var callback = function (list) {
        return list.sort();
      };
      expect(Helpers.modifyAsList('2\n1\n3', callback)).to.be('1\n2\n3');
    });
  });

  describe('.htmlCaseChanger', function () {
    it('uppercases a <strong> tag', function () {
      expect(Helpers.htmlCaseChanger('<strong>hello</strong>', true))
        .to.be('<STRONG>hello</STRONG>');
    });

    it('lowercases a <STRONG> tag', function () {
      expect(Helpers.htmlCaseChanger('<STRONG>HELLO</STRONG>', false))
        .to.be('<strong>HELLO</strong>');
    });
  });
});
