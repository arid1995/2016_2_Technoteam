(function () {
  const View = window.View;
  const Menu = window.Menu;

  class MenuView extends View {
    constructor(options = {}) {
      super(options);
      this._el = document.querySelector('.js-menu');
      this.hide();
    }

    resume() {
      if (!this.component) {
        this._component = new Menu();
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
  window.MenuView = MenuView;
})();
