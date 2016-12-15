(function () {
  const MessageHandler = window.MessageHandler;
  const Drawer = window.Drawer;

  class GameLauncher {
    constructor(canvas) {
      this._canvas = canvas;
      this._messageHandler = new MessageHandler();
    }

    launch() {
      this._socket = new WebSocket('ws://37.204.2.4:8080/gameapi');

      // this.socket.onopen = () => {
      //  alert('Соединение установлено.');
      // };

      this._socket.onmessage = (event) => {
        this.messageHandler(event.data);
      };

      this._socket.onerror = (error) => {
        alert(`Ошибка ${error.message}`);
      };

      this.TICK = 30;
      this._drawer = new Drawer(this._canvas);

      this.cycle();
    }

    cycle() {
      const before = Date.now();
      this._drawer.redraw();



      const after = Date.now();
      setTimeout(this.cycle.bind(this), this.TICK - (after - before));
    }

    stop() {
      this._socket.close();
    }
  }

  window.GameLauncher = GameLauncher;
})();
