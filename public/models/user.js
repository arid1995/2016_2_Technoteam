(function () {
  // import
  const Model = require('../modules/model').Model;

  class User extends Model {

    get defaults() {
      return {
        name: '',
        email: '',
        password: '',
      };
    }

    get url() {
      return `${this.host}/api/user/`;
    }

  }

  // export
  exports.User = User;
})();
