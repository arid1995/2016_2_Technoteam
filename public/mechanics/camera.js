(function () {
  const Drawable = require('./drawable').Drawable;

  class Camera {
    constructor(canvas, boundaries) {
      this.canvas = canvas;
      this.context = this.canvas.getContext('2d');

      this.frame = {};
      this.frame.x = 0;
      this.frame.y = 0;
      this.frame.width = canvas.width;
      this.frame.height = canvas.height;
      this.frame.zoom = 1;
      this.boundaries = boundaries;
    }

    move(velocityX = 0, velocityY = 0) {
      if ((this.frame.x + this.frame.width) - velocityX <= this.boundaries.width
            && this.frame.x + velocityX >= 0) {
        this.frame.x += velocityX;
      }

      if ((this.frame.y + this.frame.height) - velocityY <= this.boundaries.height
            && this.frame.y + velocityY >= 0) {
        this.frame.y += velocityY;
      }
    }

    setZoom(zoom = 1) {
      this.frame.zoom = zoom;

      if (zoom < 0.1) {
        this.frame.zoom = 0.1;
      }
      if (zoom > 10) {
        this.frame.zoom = 10;
      }

      this.frame.width = this.canvas.width * zoom;
      this.frame.height = this.canvas.height * zoom;
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
