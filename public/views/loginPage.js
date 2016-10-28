(function () {
	'use strict';

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

      this.show();
    }
	}


	// export
	window.LoginPageView = LoginPageView;

})();
