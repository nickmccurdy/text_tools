describe("UI", function () {
  var checkbox, numericInput, textInput;

  beforeEach(function () {
    checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    numericInput = document.createElement("input");
    numericInput.type = "number";
    numericInput.value = 5;

    textInput = document.createElement("input");
    textInput.value = "one 2 three 4 five";
  });

  describe(".toggleCheck", function () {
    it("checks an unchecked element", function () {
      UI.toggleCheck(checkbox);
      expect(checkbox.checked).to.be(true);
    });

    it("unchecks an checked element", function () {
      checkbox.checked = true;
      UI.toggleCheck(checkbox);
      expect(checkbox.checked).to.be(false);
    });
  });

  describe(".valueUp", function () {
    it("increases the value of an element by 1", function () {
      UI.valueUp(numericInput);
      expect(numericInput.value).to.be("6");
    });
  });

  describe(".valueDown", function () {
    it("decreases the value of an element by 1", function () {
      UI.valueDown(numericInput);
      expect(numericInput.value).to.be("4");
    });
  });

  describe(".numbersOnly", function () {
    it("removes all non-numeric characters from an element's value", function () {
      UI.numbersOnly(textInput);
      expect(textInput.value).to.be("24");
    });
  });
});

describe("$", function () {
  var div;

  beforeEach(function () {
    div = $(document.createElement("div"));
  });

  describe("#swapClasses", function () {
    context("when the element has the first of the two classes", function () {
      beforeEach(function () {
        div.addClass("blue");
      });

      it("removes the first class and adds the second class", function () {
        div.swapClasses("blue", "red");

        expect(div.hasClass("blue")).to.be(false);
        expect(div.hasClass("red")).to.be(true);
      });
    });

    context("when the element has the second of the two classes", function () {
      beforeEach(function () {
        div.addClass("red");
      });

      it("removes the second class and adds the first class", function () {
        div.swapClasses("blue", "red");

        expect(div.hasClass("blue")).to.be(true);
        expect(div.hasClass("red")).to.be(false);
      });
    });

    context("when the element has neither of the two classes", function () {
      it("adds the first class", function () {
        div.swapClasses("blue", "red");

        expect(div.hasClass("blue")).to.be(true);
        expect(div.hasClass("red")).to.be(false);
      });
    });
  });
});
