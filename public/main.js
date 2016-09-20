'use strict';
function onSubmit(form){

	let data = {
		user: form.elements['user'].value,
		email: form.elements['email'].value
	};

	let result = request('/users', data);

	form.hidden = true;
	window.helloWorld.innerHTML = hello(data.user) + ' ' + plural(result) + ' заходил ' + result + ' ' + plur(+result);;

	console.log(data, result);
}

function plur(num){
	switch(num%100){
		case 12:
		case 13:
		case 14:  return 'раз';
		default: break;
	}
	switch(num%10){
		case 2:
		case 3:
		case 4:  return 'раза';
		default: return 'раз';
	}
}

function hello(text) {
	return 'Привет, ' + text;
}

function plural(num){
	if(num == 0)
		return 'Здравствуй, дух';
	if(num == 1)
		return 'Рады приветствовать на нашем курсе!';
	var count = 15;
	if (num < count){
		return ("Кликай дальше!! Еще осталось " + (count-num) + " раз(а)");
	}
	return '01001000 01101001 00101100 00100000 01100010 01110010 01101111';
}

if(typeof(exports) === 'object') {
    exports.hello = hello;
		exports.plural = plural;
		exports.plur = plur;
}
