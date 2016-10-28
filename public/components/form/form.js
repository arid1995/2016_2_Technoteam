(function () {
	'use strict';

	// import
	const Block = window.Block;
	const Button = window.Button;

	class Form extends Block {

		/**
		 * Конструктор класса Form
		 */
		constructor(options = {data: {}}) {
			super('form');
			this.template = window.fest['form/form.tmpl'];
			this.data = options.data;
			this._el = options.el;
			this.render();
		}

		/**
		 * Обновляем HTML
		 */
		render() {
			this._updateHtml();
			this._installControls();
		}

		reset() {
			this._el.querySelector('form').reset();
		}

		_updateHtml() {
			this._el.innerHTML = this.template(this.data);
		}

		_installControls() {
			let {controls = []} = this.data;

			controls.forEach(data => {
				let control = new Button({text: data.text});
				this._el.querySelector('.js-controls').appendChild(control._get());
			});
		}

		getFormData() {
			let form = this._el.querySelector('form');
			let elements = form.elements;
			let fields = {};

			Object.keys(elements).forEach(element => {
				let name = elements[element].name;
				let value = elements[element].value;

				if (!name) {
					return;
				}

				fields[name] = value;
			});

			return fields;
		}

	}

	//export
	window.Form = Form;
})();
