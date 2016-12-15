(function () {
  class Drawer {
    constructor(canvas) {
      this._canvas = canvas;
      this._context = this._canvas.getContext('2d');
    }

    redraw(drawables) {
      for (const object in drawables) {
        if (object instanceof Drawable) {
          this._context.clearRect(0, 0, this._canvas.width, this.canvas.height);
          object.draw(this._context);
        }
      }
    }
  }

  window.Drawer = Drawer;
})();
