(function () {
  const Block = require('../block/block').Block;

  class Menu extends Block {
    constructor() {
      super('div');

      this._el = document.querySelector('.js-menu');
      this.template = window.fest['menu/menu.tmpl'];

      this.render();
    }

    render() {
      this._el.innerHTML = this.template({});

      document.querySelector('.leaderboard__exit')
      .addEventListener('click', (event) => {
        event.preventDefault();
        localStorage.removeItem('session');
        this.router.go('/');
      });
    }
  }

  exports.Menu = Menu;
})();
