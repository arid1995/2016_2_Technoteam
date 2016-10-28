(function () {
	'use strict';

	const Router = window.Router;
	const ChatView = window.ChatView;
	const LoginPageView= window.LoginPageView;

	(new Router)
		.addRoute('/chat', ChatView)
		.addRoute('/', LoginPageView)
		.start();

})();
