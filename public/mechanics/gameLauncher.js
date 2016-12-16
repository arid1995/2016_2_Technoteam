(function () {
  const MessageHandler = require('./messageHandler').MessageHandler;
  const Camera = require('./camera').Camera;
  const Drawable = require('./drawable').Drawable;

  class GameLauncher {
    constructor(canvas) {
      this.canvas = canvas;
      this.messageHandler = new MessageHandler();
    }

    launch() {
      this.socket = new WebSocket('ws://37.204.2.4:8080/gameapi');

      // this.socket.onopen = () => {
      //  alert('Соединение установлено.');
      // };

      this.socket.onmessage = (event) => {
        this.messageHandler(event.data);
      };

      this.socket.onerror = (error) => {
        alert(`Ошибка ${error.message}`);
      };

      this.TICK = 30;
      this.camera = new Camera(this.canvas);

      this.objects = [];
      this.objects.push(new Drawable());
      this.objects.push(new Drawable(50, 50, 60, 70));

      this.zoom = 1;

      this.x = 0;
      this.y = 0;

      this.speedX = 0;
      this.speedY = 0;

      this.setupControls();

      this.cycle();
    }

    setupControls() {
      this.canvas.addEventListener('mousemove', (event) => {
        this.speedX = 0;

        if (event.clientX < 30) {
          this.speedX = -5;
        }

        if (event.clientX > 1000) {
          this.speedX = 5;
        }
      });
    }

    cycle() {
      const before = Date.now();
      this.camera.redraw(this.objects);

      this.camera.setPosition(this.x += this.speedX);

      const after = Date.now();
      setTimeout(this.cycle.bind(this), this.TICK - (after - before));
    }

    stop() {
      this.socket.close();
    }
  }

  exports.GameLauncher = GameLauncher;
})();
