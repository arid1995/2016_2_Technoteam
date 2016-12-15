(function () {
  const Block = require('../block/block').Block;
  const UserList = require('../../models/userList').UserList;

  class LeaderBoardPage extends Block {
    constructor() {
      super('div');

      this._el = document.querySelector('.js-leader-board');
      this.template = window.fest['leaderBoardPage/leaderBoardPage.tmpl'];

      const userList = new UserList();

      userList.fetch().then(data => this.render(data));
    }

    render(data) {
      this._el.innerHTML = this.template(data);
    }
  }
  exports.LeaderBoardPage = LeaderBoardPage;
})();
