(function () {
  const Scene = require('./scene').Scene;
  const Drawable = require('./drawable').Drawable;

  class Camera {
    constructor(canvas) {
      this.canvas = canvas;
      this.context = this.canvas.getContext('2d');

      this.frame = {};
      this.frame.x = 0;
      this.frame.y = 0;
      this.frame.width = canvas.width;
      this.frame.height = canvas.height;
      this.frame.zoom = 1;

      this.scene = new Scene();
    }

    setPosition(x = 0, y = 0) {
      this.frame.x = x;
      this.frame.y = y;
    }

    setZoom(zoom = 1) {
      this.frame.zoom = zoom;

      if (zoom < 0.1) {
        this.frame.zoom = 0.1;
      }
      if (zoom > 10) {
        this.frame.zoom = 10;
      }
    }

    redraw(drawables = {}) {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

      for (const object of drawables) {
        if (object instanceof Drawable) {
          object.draw(this.context, this.frame);
        }
      }
    }
  }

  exports.Camera = Camera;
})();
