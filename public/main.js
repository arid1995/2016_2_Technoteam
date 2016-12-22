  const Router = require('./modules/router').Router;
  const LoginPageView = require('./views/loginPage').LoginPageView;
  const RegistrationPageView = require('./views/registrationPage').RegistrationPageView;
  const MenuView = require('./views/menu').MenuView;
  const LeaderBoardPageView = require('./views/leaderBoard').LeaderBoardPageView;
  const GameView = require('./views/game').GameView;

  (new Router())
    .addRoute('/registration', RegistrationPageView)
    .addRoute('/menu', MenuView)
    .addRoute('/leaderboard', LeaderBoardPageView)
    .addRoute('/game', GameView)
    .addRoute('/', LoginPageView)
    .start();
