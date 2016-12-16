(function () {
  class Drawable {
    constructor(x = 0, y = 0, width = 50, height = 50) {
      this.x = x;
      this.y = y;

      this.width = width;
      this.height = height;
    }

    draw(context, frame) {
      context.fillStyle = 'green';
      context.fillRect((this.x - frame.x) / frame.zoom,
            (this.y - frame.y) / frame.zoom, this.width / frame.zoom,
            this.height / frame.zoom);
    }

    setPosition(x = 0, y = 0) {
      this.x = x;
      this.y = y;
    }
  }

  exports.Drawable = Drawable;
})();
