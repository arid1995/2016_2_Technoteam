(function () {
  const Block = window.Block;
  const UserList = window.UserList;

  class LeaderBoardPage extends Block {
    constructor() {
      super('div');

      this._el = document.querySelector('.js-login');
      this.template = window.fest['leaderBoardPage/leaderBoardPage.tmpl'];

      const userList = new UserList();

      this.userList = userList.fetch();
      this.render(this.userList);
    }

    render(data) {
      this._el.innerHTML = this.template(this.userList);
    }
  }

  window.LeaderBoardPage = LeaderBoardPage;
})();
