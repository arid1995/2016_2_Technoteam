(function () {
  // import
  const Model = require('../modules/model').Model;

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
  exports.Session = Session;
})();
