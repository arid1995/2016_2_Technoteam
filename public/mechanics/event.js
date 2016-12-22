(function () {
  class Event {
    constructor(webSocket) {
      this._socket = webSocket;
    }

    send(type, data) {
      const message = {};

      message.type = type;
      message.data = data;
      this._socket.send(JSON.stringify(message));
    }
  }
  exports.Event = Event;
})();
