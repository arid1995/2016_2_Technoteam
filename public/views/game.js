(function () {
  const View = require('../modules/view').View;
  const Game = require('../components/game/game').Game;
  const Session = require('../models/session').Session;

  class GameView extends View {
    constructor(options = {}) {
      const session = JSON.parse(localStorage.getItem('session'));
      if (session == null) {
        super(options);
        return;
      }
      super(options);
      this._el = document.querySelector('.js-game');
      this.hide();
    }

    resume() {
      if (!this.component) {
        this._component = new Game();
        this._component.setRouter(this.router);
      }

      if (localStorage.getItem('session') === null) {
        this.router.go('/loginPage');
        return;
      }

      this.show();
    }
  }

  // export
  exports.GameView = GameView;
})();
