(function () {
  // import
  const Model = window.Model;

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
  window.User = User;
})();
