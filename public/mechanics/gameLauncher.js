(function () {
  class GameLauncher {
    constructor(canvas) {
      this._canvas = canvas;
    }

    launch() {
      this.socket = new WebSocket('ws://37.204.2.4:8080/gameapi');

      this.socket.onopen = () => {
        alert('Соединение установлено.');
      };

      this.socket.onclose = (event) => {
        alert(`Код: ${event.code} причина: ${event.reason}`);
      };

      this.socket.onmessage = (event) => {
        event.data;
      };

      this.socket.onerror = (error) => {
        alert(`Ошибка ${error.message}`);
      };

      this.begin = 0;
      this.end = 1000;
      this.direction = 1;
      this.pos = 0;

      this._context = this._canvas.getContext('2d');

      this.drawSomething();
    }

    drawSomething() {
      this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
      setTimeout(this.drawSomething.bind(this), 1);
      this._context.beginPath();
      this._context.rect(this.pos, 20, 150, 100);
      if (this.pos > this.end) { this.direction = -1; }
      if (this.pos < this.begin) this.direction = 1;
      this.pos += this.direction * 3;
      this._context.fillStyle = 'red';
      this._context.fill();
    }

    stop() {
      this.socket.close();
    }
  }

  window.GameLauncher = GameLauncher;
})();
