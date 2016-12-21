(function () {
  const Camera = require('./camera').Camera;
  const Drawable = require('./drawable').Drawable;
  const Config = require('./config').Config;
  const Engine = require('../../node_modules/matter-js/src/core/Engine').Engine;
  const Common = require('../../node_modules/matter-js/src/core/Common').Common;
  const World = require('../../node_modules/matter-js/src/body/World').World;
  const Composite = require('../../node_modules/matter-js/src/body/Composite').Composite;
  const Body = require('../../node_modules/matter-js/src/body/Body').Body;

  class Scene {
    constructor(canvas) {
      this.canvas = canvas;

      this.TICK = 30;

      this.objects = [];
      this.objects.push(new Drawable());
      this.objects.push(new Drawable(50, 50, 60, 70));

      this.zoom = 1;

      this.world = {};

      this.world.width = 1920;
      this.world.height = 1080;

      this.camera = new Camera(this.canvas, this.world);

      this.cameraSpeedX = 0;
      this.cameraSpeedY = 0;

      this.config = new Config();

      this.setupControls();
      this.loop();
    }

    setupControls() {
      this.canvas.addEventListener('mousemove', (event) => {
        this.cameraSpeedX = 0;
        this.cameraSpeedY = 0;

        if (event.clientX < 30) {
          this.cameraSpeedX = -this.config.SENSITIVITY;
        }
        if (event.clientX > this.canvas.width - 30) {
          this.cameraSpeedX = this.config.SENSITIVITY;
        }

        if (event.clientY < 30) {
          this.cameraSpeedY = -this.config.SENSITIVITY;
        }
        if (event.clientY > this.canvas.height - 30) {
          this.cameraSpeedY = this.config.SENSITIVITY;
        }
      });

      this.canvas.addEventListener('wheel', (event) => {
        if (event.deltaY < 0) {
          this.zoom *= this.config.ZOOM_SPEED;
        }
        if (event.deltaY > 0) {
          this.zoom *= 1 / this.config.ZOOM_SPEED;
        }

        if (this.zoom < this.config.MIN_ZOOM) {
          this.zoom = this.config.MIN_ZOOM;
        }
        if (this.zoom > this.config.MAX_ZOOM) {
          this.zoom = this.config.MAX_ZOOM;
        }
      });
    }

    loop() {
      const before = Date.now();
      this.camera.redraw(this.objects);


      this.camera.setZoom(this.zoom);
      this.camera.move(this.cameraSpeedX, this.cameraSpeedY);

      const after = Date.now();
      setTimeout(this.loop.bind(this), this.TICK - (after - before));
    }
  }

  exports.Scene = Scene;
})();
