(function () {
  const View = window.View;
  const Game = window.Game;
  const Session = window.Session;

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
  window.GameView = GameView;
})();
