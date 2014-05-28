'use strict';

describe('$', function () {
  var checkbox, numericInput, textInput, div;

  beforeEach(function () {
    checkbox = $('<input type="checkbox">');
    numericInput = $('<input type="number" value="5">');
    textInput = $('<input value="one 2 three 4 five">');
    div = $(document.createElement('div'));
  });

  describe('#toggleCheck', function () {
    it('checks an unchecked element', function () {
      checkbox.toggleCheck();
      expect(checkbox.checked).to.be(true);
    });

    it('unchecks an checked element', function () {
      checkbox.checked = true;
      checkbox.toggleCheck();
      expect(checkbox.checked).to.be(false);
    });
  });

  describe('#valueUp', function () {
    it('increases the value of an element by 1', function () {
      numericInput.valueUp();
      expect(numericInput.val()).to.be('6');
    });
  });

  describe('#valueDown', function () {
    it('decreases the value of an element by 1', function () {
      numericInput.valueDown();
      expect(numericInput.val()).to.be('4');
    });
  });

  describe('#numbersOnly', function () {
    it('removes all non-numeric characters from an element\'s value', function () {
      textInput.numbersOnly();
      expect(textInput.val()).to.be('24');
    });
  });

  describe('#swapClasses', function () {
    context('when the element has the first of the two classes', function () {
      beforeEach(function () {
        div.addClass('blue');
      });

      it('removes the first class and adds the second class', function () {
        div.swapClasses('blue', 'red');

        expect(div.hasClass('blue')).to.be(false);
        expect(div.hasClass('red')).to.be(true);
      });
    });

    context('when the element has the second of the two classes', function () {
      beforeEach(function () {
        div.addClass('red');
      });

      it('removes the second class and adds the first class', function () {
        div.swapClasses('blue', 'red');

        expect(div.hasClass('blue')).to.be(true);
        expect(div.hasClass('red')).to.be(false);
      });
    });

    context('when the element has neither of the two classes', function () {
      it('adds the first class', function () {
        div.swapClasses('blue', 'red');

        expect(div.hasClass('blue')).to.be(true);
        expect(div.hasClass('red')).to.be(false);
      });
    });
  });

  describe('#selectAll', function () {
    it('has tests');
  });
});
