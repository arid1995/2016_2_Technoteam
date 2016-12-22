(function () {
  class MessageHandler {

    handle(message) {
        json = JSON.parse(message);
        switch(json.type){
          case "confirmRequest":
            alert("confirm request");
          case "opponentFound":
            alert("start");
        }
    }
  }

  exports.MessageHandler = MessageHandler;
})();
