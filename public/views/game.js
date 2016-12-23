(function () {
  const View = require('../modules/view').View;
  const Game = require('../components/game/game').Game;
  const Session = require('../models/session').Session;

  class GameView extends View {
    constructor(options = {}) {
      super(options);
      this._el = document.querySelector('.js-game');
      this.hide();
    }

    resume() {
      if (!this.component) {
        this._component = new Game();
        this._component.setRouter(this.router);
      }

      this.show();
    }
  }

  // export
  exports.GameView = GameView;
})();
