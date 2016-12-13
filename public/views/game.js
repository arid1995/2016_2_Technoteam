(function () {
  const View = window.View;
  const Game = window.Game;

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
  window.GameView = GameView;
})();
