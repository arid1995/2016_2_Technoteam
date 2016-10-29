(function () {
  // import
  const Model = window.Model;

  class Session extends Model {

    get defaults() {
      return {
        login: '',
        password: '',
      };
    }

    get url() {
      return `${this.host}/api/session/`;
    }
  }

  // export
  window.Session = Session;
})();
