(function () {
	'use strict';

	//import
	let Model = window.Model;

	class User extends Model {

		constructor(attributes) {
			super(attributes);
		}

		get defaults() {
			return {
				email: '',
				password: ''
			}
		}

		get url() {
			return '/user/';
		}

	}

	//export
	window.User = User;
})();
