(function () {

  const Block = window.Block;
  const Form = window.Form;
  const User = window.User;

  class LoginPage extends Block{
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
            name: 'email',
            type: 'email',
            placeholder: 'Email'
          },
          {
            name: 'password',
            type: 'password',
            placeholder: 'Password'
          }],
          controls: [{
            text: 'Sign in',
            attrs: {
              type: 'submit'
            }
          }]
        }
      });

      this.form.render();
      this.form.on('submit', this._login.bind(this))
    }

    render() {
      this._el.innerHTML = this.template({});
    }

    _login(event) {
      event.preventDefault();

      const formData = this.form.getFormData();

      const userData = {
        email: formData.email,
        password: formData.password
      }

      const user = new User(userData);

      user.save().then(() => {
        this.form.reset();
      }).catch(() => {
        this.router.go('/chat');
        alert('error');
      })
    }
  }
  window.LoginPage = LoginPage;
})();
