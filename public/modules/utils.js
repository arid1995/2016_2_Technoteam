(function () {
  const plur = function (num) {
    switch (num % 100) {
      case 12:
      case 13:
      case 14: return 'раз';
      default: break;
    }
    switch (num % 10) {
      case 2:
      case 3:
      case 4: return 'раза';
      default: return 'раз';
    }
  };

  const hello = function (text) {
    return `Привет, ${text}`;
  };

  const plural = function (num) {
    if (num === 0) {
      return 'Здравствуй, дух';
    }
    if (num === 1) {
      return 'Рады приветствовать на нашем курсе!';
    }
    const count = 15;
    if (num < count) {
      return (`Кликай дальше!! Еще осталось ${count - num} раз(а)`);
    }
    return '01001000 01101001 00101100 00100000 01100010 01110010 01101111';
  };

  const filter = function (str, rules = ['kek', 'кек', 'shrek', 'пек', 'шрек',
                                'dreamworks']) {
    let result = str;
    rules.forEach((item, it) => {
      let patch = '';
      for (let i = 0; i < item.length; i++) {
        patch += '*';
      }
      result = result.replace(new RegExp(`\s?${item}\s?`, 'gi'), patch);
    });

    return result;
  };

  exports.hello = hello;
  exports.filter = filter;
  exports.plural = plural;
  exports.plur = plur;
})();
