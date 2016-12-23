(function () {
  const View = require('../modules/view').View;
  const Form = require('../components/form/form').Form;
  const LoginPage = require('../components/loginPage/loginPage').LoginPage;

  class LoginPageView extends View {
    constructor(options = {}) {
      super(options);
      this._el = document.querySelector('.js-login');
      this.hide();
    }

    resume() {
      if (!this.component) {
        this._component = new LoginPage();
        this._component.setRouter(this.router);
      }

      if (localStorage.getItem('session') !== null) {
        this.router.go('/');
        return;
      }
      this.show();
    }
  }


  // export
  exports.LoginPageView = LoginPageView;
})();
