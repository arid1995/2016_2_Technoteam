(function () {
  const View = window.View;
  const Form = window.Form;
  const RegistrationPage = window.RegistrationPage;

  class RegistrationPageView extends View {
    constructor(options = {}) {
      super(options);
      this._el = document.querySelector('.js-registration');
      this.hide();
    }

    resume() {
      if (!this.component) {
        this._component = new RegistrationPage();
        this._component.setRouter(this.router);
      }

      this.show();
    }
  }


  // export
  window.RegistrationPageView = RegistrationPageView;
})();
