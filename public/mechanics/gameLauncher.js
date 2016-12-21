(function () {
  const MessageHandler = require('./messageHandler').MessageHandler;
  const Scene = require('./scene').Scene;

  class GameLauncher {
    constructor(canvas) {
      this.canvas = canvas;
      this.messageHandler = new MessageHandler();
    }

    launch() {
      this.socket = new WebSocket('ws://127.0.0.1:8080/gameapi');

      this.socket.onmessage = (event) => {
        this.messageHandler(event.data);
      };

      this.socket.onerror = (error) => {
        alert(`Ошибка ${error.message}`);
      };

      this.scene = new Scene(this.canvas);
    }

    stop() {
      this.socket.close();
    }
  }

  exports.GameLauncher = GameLauncher;
})();
