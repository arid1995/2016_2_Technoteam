(function () {
  const Block = require('../block/block').Block;
  const Form = require('../form/form').Form;
  const Session = require('../../models/session').Session;

  class LoginPage extends Block {
    constructor() {
      super('div');

      this._el = document.querySelector('.js-login');
      this.template = window.fest['loginPage/loginPage.tmpl'];

      this.render();
      this.init();
    }

    init() {
      this.form = new Form({
        el: this._el.querySelector('.js-login-form'),
        data: {
          fields: [{
            name: 'login',
            type: 'text',
            placeholder: 'Login',
          },
          {
            name: 'password',
            type: 'password',
            placeholder: 'Password',
          }],
          controls: [{
            text: 'Sign in',
            attrs: {
              type: 'submit',
            },
          }],
        },
      });

      this.form.render();
      this.form.on('submit', this._login.bind(this));
    }

    render() {
      this._el.innerHTML = this.template({});
    }

    _login(event) {
      event.preventDefault();

      const formData = this.form.getFormData();

      const sessionData = {
        login: formData.login,
        password: formData.password,
      };

      const session = new Session(sessionData);

      session.save().then((session) => {
        this.form.reset();
        localStorage.setItem('session', session);
        this.router.go('/menu');
      }).catch(() => {
        alert('error');
      });
    }
  }
  exports.LoginPage = LoginPage;
})();
