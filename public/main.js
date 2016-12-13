(function () {
  const Router = window.Router;
  const ChatView = window.ChatView;
  const LoginPageView = window.LoginPageView;
  const RegistrationPageView = window.RegistrationPageView;
  const MenuView = window.MenuView;
  const LeaderBoardPageView = window.LeaderBoardPageView;
  const GameView = window.GameView;

  (new Router())
    .addRoute('/registration', RegistrationPageView)
    .addRoute('/menu', MenuView)
    .addRoute('/leaderboard', LeaderBoardPageView)
    .addRoute('/game', GameView)
    .addRoute('/', LoginPageView)
    .start();
})();
