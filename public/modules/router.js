(function () {
	'use strict';

	let Route = window.Route;

	class Router {
		constructor() {
			if (Router.__instance) {
				return Router.__instance;
			}

			this.routes = [];
			this.activeRoute = null;

			this.history = window.history;

			Router.__instance = this;
		}

		addRoute(pathname, view, options = {}) {
			let route = new Route(pathname, view, options);
			route.setRouter(this);
			this.routes.push(route);
			return this;
		}

		start(state = {}) {
			window.onpopstate = function (event) {
				let state = event.state;
				let pathname = window.location.pathname;
				this.onroute(pathname, state);
			}.bind(this);

			const pathname = window.location.pathname;
			this.onroute(pathname, state);
		}

		onroute(pathname, state = {}) {
			let route = this.routes.find(route => route.match(pathname));
			if (!route) {
				return;
			}

			if (this.activeRoute) {
				this.activeRoute.leave();
			}

			this.activeRoute = route;
			this.activeRoute.navigate(pathname, state);
		}

		go(pathname, state = {}) {
			if (window.location.pathname === pathname) {
				return;
			}
			this.history.pushState(state, '', pathname);
			this.onroute(pathname, state);
		}

		setHistory(history) {
			this.history = history;
		}

		back() {
			this.history.back();
		}

		forward() {
			this.history.forward();
		}
	}

	window.Router = Router;

})();
