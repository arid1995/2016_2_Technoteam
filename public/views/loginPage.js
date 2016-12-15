(function () {
  const View = window.View;
  const Form = window.Form;
  const LoginPage = window.LoginPage;

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
        this.router.go('/menu');
        return;
      }
      this.show();
    }
  }


  // export
  window.LoginPageView = LoginPageView;
})();
