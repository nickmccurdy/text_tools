'use strict';

describe('Effects', function () {
  var shortInput = 'Hello world';

  sinon.stub(Elements.$cutoff, 'val').returns(2);
  sinon.stub(Elements.$find_text, 'val').returns('two');
  sinon.stub(Elements.$repetitions, 'text').returns('5');
  sinon.stub(Elements.$replace_text, 'val').returns('to');
  sinon.stub(View, 'getQuery').returns('two');

  describe('.normal', function () {
    it('returns the unchanged input', function () {
      expect(Effects.normal(shortInput)).to.be(shortInput);
    });
  });

  describe('.lowercase', function () {
    it('returns the lowercased input', function () {
      expect(Effects.lowercase(shortInput)).to.be('hello world');
    });
  });

  describe('.uppercase', function () {
    it('returns the uppercased input', function () {
      expect(Effects.uppercase(shortInput)).to.be('HELLO WORLD');
    });
  });

  describe('.htmllower', function () {
    it('lowercases a <STRONG> tag', function () {
      expect(Effects.htmllower('<STRONG>HELLO</STRONG>'))
        .to.be('<strong>HELLO</strong>');
    });
  });

  describe('.htmlupper', function () {
    it('uppercases a <strong> tag', function () {
      expect(Effects.htmlupper('<strong>hello</strong>'))
        .to.be('<STRONG>hello</STRONG>');
    });
  });

  describe('.titlecase', function () {
    it('returns the titleized input', function () {
      expect(Effects.titlecase(shortInput)).to.be('Hello World');
    });
  });

  describe('.find', function () {
    context('without a regex', function () {
      it('finds and uppercases a substring', function () {
        expect(Effects.find('one two three')).to.be('one TWO three');
      });
    });

    context('with a regex', function () {
      it('finds and uppercases regex matches');
    });
  });

  describe('.replace', function () {
    context('without a regex', function () {
      it('finds and replaces a substring', function () {
        expect(Effects.replace('one two three')).to.be('one to three');
      });
    });

    context('with a regex', function () {
      it('finds and replaces regex matches');
    });
  });

  describe('.list', function () {
    context('without numbering', function () {
      it('turns input lines into an unordered list', function () {
        sinon.stub(Elements.$list_start, 'val').returns('- ');
        sinon.stub(Elements.$number_list, 'attr').withArgs('checked').returns(false);

        expect(Effects.list('one\ntwo\nthree')).to.be('- one\n- two\n- three');

        Elements.$list_start.val.restore();
        Elements.$number_list.attr.restore();
      });
    });

    context('with numbering', function () {
      it('turns input lines into an ordered list', function () {
        sinon.stub(Elements.$list_start, 'val').returns('. ');
        sinon.stub(Elements.$number_list, 'attr').withArgs('checked').returns(true);

        expect(Effects.list('one\ntwo\nthree')).to.be('1. one\n2. two\n3. three');

        Elements.$list_start.val.restore();
        Elements.$number_list.attr.restore();
      });
    });
  });

  describe('.remove_list', function () {
    it('removes the first two characters from every line of the input', function () {
      expect(Effects.remove_list('- one\n- two\n- three')).to.be('one\ntwo\nthree');
    });
  });

  describe('.repeat', function () {
    it('repeats a string a certain number of times', function () {
      expect(Effects.repeat('swag ')).to.be('swag swag swag swag swag ');
    });
  });

  describe('.wordcount', function () {
    it('counts the characters, words, and lines in a string', function () {
      expect(Effects.wordcount('one two\nthree'))
      .to.be('Characters: 13\nWords: 3\nLines: 2');
    });
  });

  describe('.sortaz', function () {
    it('sorts the input alphabetically', function () {
      expect(Effects.sortaz('b\na\nc')).to.be('a\nb\nc');
    });
  });

  describe('.sortza', function () {
    it('sorts the input alphabetically in reverse', function () {
      expect(Effects.sortza('b\na\nc')).to.be('c\nb\na');
    });
  });

  describe('.sortreverse', function () {
    it('sorts the input in reverse', function () {
      expect(Effects.sortreverse('b\na\nc')).to.be('c\na\nb');
    });
  });

  describe('.sortrandom', function () {
    it('sorts the input randomly', function () {
      var possibleResults = [
        'a\nb\nc',
        'a\nc\nb',
        'b\na\nc',
        'b\nc\na',
        'c\na\nb',
        'c\nb\na'
      ];
      expect(Effects.sortrandom('b\na\nc'))
        .to.match(new RegExp(possibleResults.join('|')));
    });
  });

  describe('.rot13', function () {
    it('encrypts the input into rot13', function () {
      expect(Effects.rot13(shortInput)).to.be('Uryyb jbeyq');
    });

    it('decrypts the input from rot13', function () {
      expect(Effects.rot13('Uryyb jbeyq')).to.be(shortInput);
    });
  });

  describe('.backwards', function () {
    it('returns the input backwards', function () {
      expect(Effects.backwards(shortInput)).to.be('dlrow olleH');
    });
  });
});
