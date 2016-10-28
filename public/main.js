(function () {
	'use strict';

	const Router = window.Router;
	const ChatView = window.ChatView;
	const LoginPageView = window.LoginPageView;
  const RegistrationPageView = window.RegistrationPageView;

	(new Router)
		.addRoute('/chat', ChatView)
    .addRoute('/registration', RegistrationPageView)
		.addRoute('/', LoginPageView)
		.start();

})();
