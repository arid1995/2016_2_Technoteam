(function () {
  // import
  const Model = require('../modules/model').Model;

  class UserList extends Model {

    get defaults() {
      return {};
    }

    get url() {
      return `${this.host}/api/userlist/`;
    }

    fetch() {
      return new Promise((resolve, reject) => {
        this.send('GET')
        .then(data => JSON.parse(data))
        .then((json) => {
          resolve(json);
        });
      });
    }

  }

  // export
  exports.UserList = UserList;
})();
