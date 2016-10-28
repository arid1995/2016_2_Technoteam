(function () {
	'use strict';

	// import
	const Block = window.Block;
	const Form = window.Form;
	const Message = window.Message;


	class Chat extends Block {

		constructor({data = {messages: [], username: '', email: ''}, el}) {
			super('form');
			this.template = window.fest['chat/chat.tmpl'];
			this.data = data;
			this._el = el;

			this.init();
			this.render();
		}

		init() {
			this._updateHtml();
			this.form = new Form({
				el: this._el.querySelector('.js-chat-form'),
				data: {
					fields: [
						{
							name: 'message',
							type: 'text',
							placeholder: 'Ваше сообщение'
						}
					],
					controls: [
						{
							text: 'Отправить',
							attrs: {
								type: 'submit'
							}
						}
					]
				}
			});
			this.form.on('submit', this._sendMessage.bind(this));

		}

		render() {
			this._renderMessages();
			this._renderForm();
		}

		set(data) {
			this.data = Object.assign({}, this.data, data);
			return this.render();
		}

		subscribe() {
			technolibs.onMessage(this._updateMessages.bind(this));
		}

		_sendMessage(event) {
			event.preventDefault();

			let data = {
				message: this.form.getFormData().message,
				email: this.data.email
			};

			let message = new Message(data);

			message.save()
				.then(data => {
					this.form.reset();
				});
		}

		_updateHtml() {
			this.data.username = this.data.username || this.data.user || 'Anon';
			this._el.innerHTML = this.template(this.data);
		}

		_renderMessages() {
			let wrapper = this._el.querySelector('.js-messages');
			console.log(this.data);

			wrapper.innerHTML = this.template({
				block: 'chat__messages',
				data: this.data.messages
			});

			wrapper.scrollTop = wrapper.scrollHeight;
		}

		_renderForm() {
			this.form.render();
		}

		_updateMessages(data) {
			let messages = Object.keys(data).map(key => {
				let entry = data[key];

				entry.background = technolibs.colorHash(entry.email || '');
				entry.isMy = this.data.email === entry.email;

				return entry;
			});

			this.set({messages});
			this._renderMessages();
		}
	}

	window.Chat = Chat;
})();
