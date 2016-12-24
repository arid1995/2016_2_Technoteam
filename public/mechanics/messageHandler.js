(function () {
  class MessageHandler {

    setGame(g){
      this.game = g;
    }

    handle(message) {
        var json = JSON.parse(message);
        switch(json.type){
          case "confirmRequest":
            //alert("confirm request");
          case "opponentFound":
            this.game.room = json.data.room;
            this.game.setTurn(json.data.turn);
            break;
          case "fieldState":
            var data = JSON.parse(json.data);
            this.game.flag = true;
            this.game.setBodies(data);
            break;
          case "event":
            this.game.setTurn(json.data.turn);
          case "trouble":
            this.game.reset();
        }
    }
  }

  exports.MessageHandler = MessageHandler;
})();
