(function () {
  const Block = require('../block/block').Block;

  class Button extends Block {
    constructor(options) {
      super('button', options);
      this._el.classList.add('button');
      this._el.innerText = this._options.text || 'Press me';
    }
  }

  // export
  exports.Button = Button;
})();
