(function () {
  class Drawable {
    constructor(x = 0, y = 0) {
      this.x = x;
      this.y = y;
    }

    draw(context) {
    }

    setPosition(x = 0, y = 0) {
      this.x = x;
      this.y = y;
    }
  }

  exports.Drawable = Drawable;
})();
