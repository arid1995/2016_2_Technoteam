(function () {
  let id = 0;

  /** Класс представляет собой Путь в вашем приложении */
  class Route {
    constructor(pathname, view, options = {}) {
      // TODO: Сущий адище, нам нужно менеджерить депсы
      this.pathToRegex = window.pathToRegex;

      this.id = `p${id}`;
      id++;
      this.pathname = pathname;
      this.regex = this.pathToRegex(pathname);
      this.View = view;
      this.options = options;
    }

    match(pathname) {
      return !!this.regex(pathname);
    }

    navigate(pathname, state = {}) {
      state = state || {};
      const keys = this.regex(pathname);
      if (!this._view) {
        const view = new this.View(this.options);
        view.init(this.options);
        view.setRouter(this.__router);
        this._view = view;
      }

      this._view.resume(Object.assign(state, keys));
    }

    /**
     * Деактивирует текущий Route
     */
    leave() {
      this._view && this._view.pause();
    }

    /**
     * Устанавливает текущему Route инстанс роутера
     * @param {Router} router - Инстанс роутера
     */
    setRouter(router) {
      this.__router = router;
    }
  }

  // export
  window.Route = Route;
})();
