describe("Effects", function () {
  var shortInput = "Hello world";

  describe(".normal", function () {
    it("returns the unchanged input", function () {
      expect(Effects.normal(shortInput)).to.be(shortInput);
    });
  });

  describe(".lowercase", function () {
    it("returns the lowercased input", function () {
      expect(Effects.lowercase(shortInput)).to.be("hello world");
    });
  });

  describe(".uppercase", function () {
    it("returns the uppercased input", function () {
      expect(Effects.uppercase(shortInput)).to.be("HELLO WORLD");
    });
  });

  describe(".htmllower", function () {
    it("lowercases a <STRONG> tag", function () {
      expect(Effects.htmllower("<STRONG>HELLO</STRONG>"))
            .to.be("<strong>HELLO</strong>");
    });
  });

  describe(".htmlupper", function () {
    it("uppercases a <strong> tag", function () {
      expect(Effects.htmlupper("<strong>hello</strong>"))
            .to.be("<STRONG>hello</STRONG>");
    });
  });

  describe(".titlecase", function () {
    it("returns the titleized input", function () {
      expect(Effects.titlecase(shortInput)).to.be("Hello World");
    });
  });

  describe(".find", function () {
    it("has tests with support for extra options");
  });

  describe(".replace", function () {
    it("has tests with support for extra options");
  });

  describe(".list", function () {
    it("has tests with support for extra options");
  });

  describe(".remove_list", function () {
    it("has tests with support for extra options");
  });

  describe(".repeat", function () {
    it("has tests with support for extra options");
  });

  describe(".wordcount", function () {
    it("has tests");
  });

  describe(".sortaz", function () {
    it("has tests");
  });

  describe(".sortza", function () {
    it("has tests");
  });

  describe(".sortreverse", function () {
    it("has tests");
  });

  describe(".sortrandom", function () {
    it("has tests");
  });

  describe(".rot13", function () {
    it("has tests");
  });

  describe(".backwards", function () {
    it("has tests");
  });
});
