(function(){
const Box2D = require('./Box2dWeb-2.1.a.3.min').Box2D
const Event = require('./event').Event;
const TICK = 30;
const entities = require('./entities').entities;
var box2d = require('./box2d').box2d;
var levels = require('./levels').levels;
var loader = require('./loader').loader;

var b2Vec2 = Box2D.Common.Math.b2Vec2;

var current = 0;

var game = {
	init: function(canvas, socket){
		game.canvas = canvas;
    box2d.setCanvas(canvas);
		game.socket = socket;
		loader.init();
		mouse.init();
		game.loop();
		game.event = new Event(game.socket);
		game.context = game.canvas.getContext('2d');
    levels.init(game);
	},
  reset: function() {
    levels.init(game);
  },
  setTurn: function(_turn) {
    turn = _turn;
  },
	setBodies:function(arr){
		game.arrOfBodies = arr;
	},
  getBodies:function(){
    const arr = [];
    for (var body = box2d.world.GetBodyList(); body; body = body.GetNext()) {
      arr.push(body.GetPosition());
      arr.push(body.GetAngle());
    }
    return arr;
  },
	mode:"intro",
	socket:null,
	slingshotX:[100, 950],
	slingshotY:280,
	canvas:null,
	start:function(){

		game.mode = "intro";
		game.offsetLeft = 0;
		game.ended = false;
		game.animationFrame = window.requestAnimationFrame(game.animate,game.canvas);
	},

	loop:function(){
		const before = Date.now();
		if(game.turn){
			var arr = [];
			for (var body = box2d.world.GetBodyList(); body; body = body.GetNext()) {
				arr.push(body.GetPosition());
				arr.push(body.GetAngle());
			}
			var arrjson = JSON.stringify(arr);
			var message = {room: game.room, objects: arrjson};
			var json = JSON.stringify(message);
			game.event.send("fieldState", json);
		}
		const after = Date.now();
		setTimeout(this.loop.bind(this), TICK - (after - before));
	},

	maxSpeed:3,
	minOffset:0,
	maxOffset:300,
	offsetLeft:0,
	score:0,

	panTo:function(newCenter){
		if (Math.abs(newCenter-game.offsetLeft-game.canvas.width/4)>0
			&& game.offsetLeft <= game.maxOffset && game.offsetLeft >= game.minOffset){

			var deltaX = Math.round((newCenter-game.offsetLeft-game.canvas.width/4)/2);
			if (deltaX && Math.abs(deltaX)>game.maxSpeed){
				deltaX = game.maxSpeed*Math.abs(deltaX)/(deltaX);
			}
			game.offsetLeft += deltaX;
		} else {

			return true;
		}
		if (game.offsetLeft <game.minOffset){
			game.offsetLeft = game.minOffset;
			return true;
		} else if (game.offsetLeft > game.maxOffset){
			game.offsetLeft = game.maxOffset;
			return true;
		}
		return false;
	},
	countHeroesAndVillains:function(){
		game.heroes = [];
		game.villains = [];
		for (var body = box2d.world.GetBodyList(); body; body = body.GetNext()) {
			var entity = body.GetUserData();
			if(entity){
				if(entity.type == "hero"){
					game.heroes.push(body);
				} else if (entity.type =="villain"){
					game.villains.push(body);
				}
			}
		}
	},
  	mouseOnCurrentHero:function(){
		if(!game.currentHero){
			return false;
		}
		var position = game.currentHero.GetPosition();
		var distanceSquared = Math.pow(position.x*box2d.scale - mouse.x-game.offsetLeft,2) + Math.pow(position.y*box2d.scale-mouse.y,2);
		var radiusSquared = Math.pow(game.currentHero.GetUserData().radius,2);

		return (distanceSquared<= radiusSquared);
	},
	handlePanning:function(){
		if(game.mode=="intro"){
				game.mode = "load-next-hero";
		}

		if (game.mode=="wait-for-firing"){
			if (mouse.dragging){
				if (game.mouseOnCurrentHero()){
					game.mode = "firing";

				}
			}
		}

		if (game.mode == "firing"){
			if(mouse.down){
				var distance = Math.sqrt(Math.pow(mouse.x-mouse.downX,2) + Math.pow(mouse.y-mouse.downY,2));
				var maxDistance = 130;
				if (maxDistance > distance){
					game.currentHero.SetPosition({x:(mouse.x+game.offsetLeft)/box2d.scale,y:mouse.y/box2d.scale});
				} else {
					var angle = Math.atan2(mouse.y-mouse.downY,mouse.x-mouse.downX);
					game.currentHero.SetPosition({x:(mouse.downX + maxDistance * Math.cos(angle)+game.offsetLeft)/box2d.scale,y:(mouse.downY + maxDistance * Math.sin(angle))/box2d.scale});
				}
			} else {

				game.mode = "fired";
				var impulseScaleFactor = 0.75;
				var slingshotCenterX = game.slingshotX[current] + 35;
				var slingshotCenterY = game.slingshotY+25;
				var impulse = new b2Vec2((slingshotCenterX -mouse.x-game.offsetLeft)*impulseScaleFactor,(slingshotCenterY-mouse.y)*impulseScaleFactor);
				game.currentHero.ApplyImpulse(impulse,game.currentHero.GetWorldCenter());
				game.currentHero.SetAngularDamping(0.5);
				game.currentHero.SetLinearDamping(0.1);

			}
		}

		if (game.mode == "fired"){
			var heroX = game.currentHero.GetPosition().x*box2d.scale;

			if(!game.currentHero.IsAwake() || heroX<0 || heroX >game.canvas.width ){
				box2d.world.DestroyBody(game.currentHero);
				game.currentHero = undefined;
				game.mode = "load-next-hero";
				if (current)
					current = 0;
				else {
					current = 1;
				}
			}
		}


		if (game.mode == "load-next-hero"){
			game.countHeroesAndVillains();
			if (game.villains.length == 0){
				game.mode = "level-success";
				return;
			}
			if (game.heroes.length == 0){
				game.mode = "level-failure"
				return;
			}

			if(!game.currentHero){
				game.currentHero = game.heroes[game.heroes.length-1];
				game.currentHero.SetPosition({x:(game.slingshotX[current]+40)/box2d.scale,y:300/box2d.scale});
	 			game.currentHero.SetLinearVelocity({x:0,y:0});
	 			game.currentHero.SetAngularVelocity(0);
				game.currentHero.SetAwake(true);
			} else {
				if(!game.currentHero.IsAwake()){
					game.mode = "wait-for-firing";
				}
			}
		}

			if(game.mode=="level-success" || game.mode=="level-failure"){
				if(game.panTo(0)){
					game.ended = true;
				}
			}
	  	},

	animate:function(){
		game.handlePanning();
			var currentTime = new Date().getTime();
			var timeStep;
			if (game.lastUpdateTime){
				timeStep = (currentTime - game.lastUpdateTime)/1000;
				if(timeStep > 2/60){
					timeStep = 2/60
				}
				box2d.step(timeStep);
			}
			game.lastUpdateTime = currentTime;


		game.drawAllBodies();

		if (!game.ended){
			game.animationFrame = window.requestAnimationFrame(game.animate,game.canvas);
		}
	},
	drawAllBodies:function(){
		box2d.world.DrawDebugData();
		var i = 0;
		for (var body = box2d.world.GetBodyList(); body; body = body.GetNext()) {
			if(game.turn == false && game.flag){
				body.SetPosition(game.arrOfBodies[i]);
				i++;
				body.SetAngle(game.arrOfBodies[i]);
				i++;
			}
			var entity = body.GetUserData();
			if(entity){
				var entityX = body.GetPosition().x*box2d.scale;
					entities.draw(entity,body.GetPosition(),body.GetAngle())
				//}
			}
		}
	},
}

var mouse = {
	x:0,
	y:0,
	down:false,
	init:function(){
		game.canvas.addEventListener('mousemove', mouse.mousemovehandler)
		game.canvas.addEventListener('mousedown', mouse.mousedownhandler)
		game.canvas.addEventListener('mouseup', mouse.mouseuphandler)
		game.canvas.addEventListener('mouseout', mouse.mouseuphandler)
	},
	mousemovehandler:function(ev){
		//var offset = 0;

		mouse.x = ev.pageX;
		mouse.y = ev.pageY;

		if (mouse.down) {
			mouse.dragging = true;
		}
	},
	mousedownhandler:function(ev){
		mouse.down = true;
		mouse.downX = ev.pageX;
		mouse.downY = ev.pageY;

	},
	mouseuphandler:function(ev){
		mouse.down = false;
		mouse.dragging = false;
	}
}

exports.game = game;
})();
