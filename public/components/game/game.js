(function () {
  const Block = window.Block;
  const Button = window.Button;
  const Auth = window.Auth;
  const GameLauncher = window.GameLauncher;

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
      this._canvas.width = window.screen.width;
      this._canvas.height = window.screen.height * 0.98;
      this.append(this._canvas);
    }

    render() {
      this._el.innerHTML = this.template({});
    }

    quitGame() {
      this._gameLauncher.stop();
    }
  }

  window.Game = Game;
})();
