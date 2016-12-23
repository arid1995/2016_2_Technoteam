(function () {
  const Block = require('../block/block').Block;
  const Form = require('../form/form').Form;
  const User = require('../../models/user').User;
  const Session = require('../../models/session').Session;

  class RegistrationPage extends Block {
    constructor() {
      super('div');

      this._el = document.querySelector('.js-registration');
      this.template = window.fest['registrationPage/registrationPage.tmpl'];

      this.render();
      this.init();
    }

    init() {
      this.form = new Form({
        el: this._el.querySelector('.js-registration-form'),
        data: {
          fields: [{
            name: 'email',
            type: 'email',
            placeholder: 'Email',
          },
          {
            name: 'login',
            type: 'text',
            placeholder: 'Your name',
          },
          {
            name: 'password',
            type: 'password',
            placeholder: 'Password',
          },
          {
            name: 'confirmation',
            type: 'password',
            placeholder: 'Confirm your password',
          }],
          controls: [{
            text: 'Sign up',
            attrs: {
              type: 'submit',
            },
          }],
        },
      });

      this.form.render();
      this.form.on('submit', this._register.bind(this));
    }

    render() {
      this._el.innerHTML = this.template({});
    }

    _register(event) {
      event.preventDefault();

      const formData = this.form.getFormData();

      const userData = {
        login: formData.login,
        email: formData.email,
        password: formData.password,
      };

      const user = new User(userData);

      user.save().then(() => {
        const formData = this.form.getFormData();
        const sessionData = {
          login: formData.login,
          password: formData.password,
        };
        const session = new Session(sessionData);

        session.save().then((session) => {
          localStorage.setItem('session', session);
          this.router.go('/menu');
        }).catch(() => {
          alert('signin error');
        });
      }).catch(() => {
        alert('signup error');
      });
    }
  }
  exports.RegistrationPage = RegistrationPage;
})();
