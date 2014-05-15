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
