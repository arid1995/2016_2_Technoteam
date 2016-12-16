(function () {
  const Block = require('../block/block').Block;
  const Button = require('../button/button').Button;
  const GameLauncher = require('../../mechanics/gameLauncher').GameLauncher;

  class Game extends Block {
    constructor() {
      super('div');

      this._el = document.querySelector('.js-game');
      this.template = window.fest['game/game.tmpl'];
      this.render();

      this.createAndConfigureCanvas();

      this._gameLauncher = new GameLauncher(this._canvas);

      this._gameLauncher.launch();
    }

    createAndConfigureCanvas() {
      this._canvas = document.createElement('canvas');
      this._canvas.width = window.innerWidth;
      this._canvas.height = window.innerHeight * 0.98;
      this.append(this._canvas);
    }

    render() {
      this._el.innerHTML = this.template({});
    }

    quitGame() {
      this._gameLauncher.stop();
    }
  }

  exports.Game = Game;
})();
