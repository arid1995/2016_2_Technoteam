(function () {
  const View = window.View;
  const LeaderBoardPage = window.LeaderBoardPage;

  class LeaderBoardPageView extends View {
    constructor(options = {}) {
      super(options);
      this._el = document.querySelector('.js-leader-board');
      this.hide();
    }

    resume() {
      if (!this.component) {
        this._component = new LeaderBoardPage();
        this._component.setRouter(this.router);
      }

      if (localStorage.getItem('session') === null) {
        this.router.go('/loginPage');
        return;
      }
      
      this.show();
    }
  }


  // export
  window.LeaderBoardPageView = LeaderBoardPageView;
})();
