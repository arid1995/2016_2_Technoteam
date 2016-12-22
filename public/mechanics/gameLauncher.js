(function () {
  const MessageHandler = require('./messageHandler').MessageHandler;
  //const Scene = require('./scene').Scene;
  const Game = require('./game').Game;

  class GameLauncher {
    constructor(canvas) {
      this.canvas = canvas;
      this.messageHandler = new MessageHandler();
    }

    launch() {
      this.socket = new WebSocket('ws://37.204.2.4:8080/gameapi');

      this.socket.onmessage = (event) => {
        this.messageHandler(event.data);
      };

      this.socket.onerror = (error) => {
        alert(`Ошибка ${error.message}`);
      };

      this.game = new Game(this.canvas);
    }

    stop() {
      this.socket.close();
    }
  }

  exports.GameLauncher = GameLauncher;
})();
