(function () {
  const MessageHandler = require('./messageHandler').MessageHandler;
  // const Scene = require('./scene').Scene;
  const game = require('./game').game;
  const Event = require('./event').Event;


  class GameLauncher {
    constructor(canvas) {
      this.canvas = canvas;
      this.messageHandler = new MessageHandler();
    }

    launch() {
      this.socket = new WebSocket('ws://angrybirds.ml:8081/gameapi');
      this.event = new Event(this.socket);

      this.socket.onmessage = (event) => {
        this.messageHandler.handle(event.data);
      };

      this.socket.onerror = (error) => {
        alert(`Ошибка ${error.message}`);
      };

      this.socket.onopen = () => {
        var message = {username: "guest", id: 0};
    		var json = JSON.stringify(message);
    		this.event.send("ready", json);
      };

      game.init(this.canvas, this.socket);
      this.messageHandler.setGame(game);
    }

    stop() {
      this.socket.close();
    }
  }

  exports.GameLauncher = GameLauncher;
})();
