(function () {
  const View = require('../modules/view').View;
  const Menu = require('../components/menu/menu').Menu;

  class MenuView extends View {
    constructor(options = {}) {
      super(options);
      this._el = document.querySelector('.js-menu');
      this.hide();
    }

    resume() {
      if (localStorage.getItem('session') === null) {
        this.router.go('/');
        return;
      }

      if (!this.component) {
        this._component = new Menu();
        this._component.setRouter(this.router);
      }

      this.show();
    }
  }

  // export
  exports.MenuView = MenuView;
})();
