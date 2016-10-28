(function () {
  // import
  const Model = window.Model;

  class Message extends Model {

    get defaults() {
      return {
        name: 'Anon',
        email: 'anon@mail.ru',
      };
    }

    get url() {
      return '/api/messages/';
    }

  }

  // export
  window.Message = Message;
})();
