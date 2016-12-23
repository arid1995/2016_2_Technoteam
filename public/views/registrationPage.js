(function () {
  const View = require('../modules/view').View;
  const Form = require('../components/form/form').Form;
  const RegistrationPage = require('../components/registrationPage/registrationPage').RegistrationPage;

  class RegistrationPageView extends View {
    constructor(options = {}) {
      super(options);
      this._el = document.querySelector('.js-registration');
      this.hide();
    }

    resume() {
      if (localStorage.getItem('session') !== null) {
        this.router.go('/menu');
        return;
      }

      if (!this.component) {
        this._component = new RegistrationPage();
        this._component.setRouter(this.router);
      }

      this.show();
    }
  }


  // export
  exports.RegistrationPageView = RegistrationPageView;
})();
