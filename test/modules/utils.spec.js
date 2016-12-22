(function () {
  describe('Hello function', function () {
    it('Hello is working', function () {
      expect(hello('Test')).toEqual('Привет, Test');
    });
  });

  describe('Pluralization', function () {
    it('Plural function', function () {
      expect(plural(0)).toEqual('Здравствуй, дух');
      expect(plural(1)).toEqual('Рады приветствовать на нашем курсе!');
      expect(plural(2)).toEqual('Кликай дальше!! Еще осталось 13 раз(а)');
      expect(plural(13)).toEqual('Кликай дальше!! Еще осталось 2 раз(а)');
      expect(plural(15)).toEqual('01001000 01101001 00101100 00100000 01100010 01110010 01101111');
      expect(plural(100)).toEqual('01001000 01101001 00101100 00100000 01100010 01110010 01101111');
    });
  });

  describe('Pluralization', function () {
    it('Plur function', function () {
      expect(plur(0)).toEqual('раз');
      expect(plur(1)).toEqual('раз');
      expect(plur(2)).toEqual('раза');
      expect(plur(12)).toEqual('раз');
      expect(plur(101)).toEqual('раз');
      expect(plur(204)).toEqual('раза');
    });
  });

  describe('Censorship', function () {
    it('filter function', function () {
      expect(filter('КЕК ПЕК')).toEqual('*** ***');
      expect(filter('КЕК КЕК')).toEqual('*** ***');

      expect(filter('Go KeK yourself, you kEkckin\' Kek!'))
      .toEqual('Go *** yourself, you ***ckin\' ***!');

      expect(filter(`God I hate this Shrek movie and the fucking Dreamworks
        company! They gave birth to Kek! ШрЕк them!!!`))
        .toEqual(`God I hate this ***** movie and the fucking **********
        company! They gave birth to ***! **** them!!!`);

      expect(filter('КЕК ПЕК, Shrek is a kek.'))
      .toEqual('*** ***, ***** is a ***.');

      expect(filter('shrek must die cause he is a total kek!'))
      .toEqual('***** must die cause he is a total ***!');
    });
  });
})();
