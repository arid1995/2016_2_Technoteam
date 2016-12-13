(function () {
  const Block = window.Block;

  class Game extends Block {
    constructor() {
      super('div');

      this._el = document.querySelector('.js-game');
      this.template = window.fest['game/game.tmpl'];

      this.render();
    }

    render() {
      this._el.innerHTML = this.template({});
    }
  }

  window.Game = Game;
})();
