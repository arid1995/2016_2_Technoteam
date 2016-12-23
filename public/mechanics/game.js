(function(){
const Box2D = require('./Box2dWeb-2.1.a.3.min').Box2D
const Event = require('./event').Event;
const TICK = 30;

var b2Vec2 = Box2D.Common.Math.b2Vec2;
var b2BodyDef = Box2D.Dynamics.b2BodyDef;
var b2Body = Box2D.Dynamics.b2Body;
var b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
var b2Fixture = Box2D.Dynamics.b2Fixture;
var b2World = Box2D.Dynamics.b2World;
var b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
var b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
var b2DebugDraw = Box2D.Dynamics.b2DebugDraw;

var current = 0;

var game = {
	init: function(canvas, socket){
		game.canvas = canvas;
		game.socket = socket;
		levels.init();
		loader.init();
		mouse.init();
		game.loop();
		/*var xhr = new XMLHttpRequest();
		xhr.open('GET', 'http://37.204.2.4:8081/api/session/', false);
		xhr.send();
		if (xhr.status != 200) {
  		alert( xhr.status + ': ' + xhr.statusText ); // пример вывода: 404: Not Found
		} else {
  		json = JSON.parse(xhr.responseText); // responseText -- текст ответа.
		}
		xhr.open('GET', 'http://37.204.2.4:8081/api/user/' + json.id, false);
		xhr.send();
		if (xhr.status != 200) {
			alert( xhr.status + ': ' + xhr.statusText ); // пример вывода: 404: Not Found
		} else {
			json = JSON.parse(xhr.responseText); // responseText -- текст ответа.
		}*/

		game.event = new Event(game.socket);
		/*game.id = 19;
		game.login = "arid995";*/
		game.context = game.canvas.getContext('2d');
		/*var message = {username: game.login, id: game.id};
		var json = JSON.stringify(message);
		game.event.send("ready", json);*/
	},
	setBodies:function(arr){
		game.arrOfBodies = arr;
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
				if(timeStep >2/60){
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
			console.log(game.turn, game.flag);
			if(game.turn == false && game.flag){
				body.SetPosition(game.arrOfBodies[i]);
				i++;
				console.log("position: " + game.arrOfBodies[i-1])
				body.SetAngle(game.arrOfBodies[i]);
				i++;
				console.log("angle: " + game.arrOfBodies[i-1])
			}
			var entity = body.GetUserData();
			if(entity){
				var entityX = body.GetPosition().x*box2d.scale;
				/*if(entityX<0|| entityX>game.canvas.width||(entity.health && entity.health <0)){
					box2d.world.DestroyBody(body);
					if (entity.type=="villain"){
						game.score += entity.calories;
					}
				} else {*/
					entities.draw(entity,body.GetPosition(),body.GetAngle())
				//}
			}
		}
	},
}

var levels = {
	data:[
	 {
		foreground:'desert-foreground',
		background:'clouds-background',
		entities:[
			{type:"ground", name:"dirt", x:500,y:440,width:1400,height:20,isStatic:true},
			{type:"ground", name:"wood", x:game.slingshotX[0]+40,y:390,width:10,height:60,isStatic:true},
			{type:"ground", name:"wood", x:game.slingshotX[1]+40,y:390,width:10,height:60,isStatic:true},

			{type:"block", name:"wood", x:320,y:380,angle:90,width:100,height:25},
			{type:"block", name:"glass", x:320,y:280,angle:90,width:100,height:25},
			{type:"villain", name:"burger",x:320,y:205,calories:590},

			{type:"block", name:"wood", x:820,y:380,angle:90,width:100,height:25},
			{type:"block", name:"glass", x:820,y:280,angle:90,width:100,height:25},
			{type:"villain", name:"fries", x:820,y:205,calories:420},

			{type:"hero", name:"orange",x:80,y:405},
			{type:"hero", name:"apple",x:140,y:405},
		]
	 },
	],

	init:function(){
		levels.load(0);
	},

	load:function(number){
		box2d.init();

		game.currentLevel = {number:number,hero:[]};
		game.score=0;
		game.currentHero = undefined;
		var level = levels.data[number];

		for (var i = level.entities.length - 1; i >= 0; i--){
			var entity = level.entities[i];
			entities.create(entity);
		};

	   if(loader.loaded){
		   game.start()
	   } else {
		   loader.onload = game.start;
	   }
	}
}

var entities = {
	definitions:{
		"glass":{
			fullHealth:100,
			density:2.4,
			friction:0.4,
			restitution:0.15,
		},
		"wood":{
			fullHealth:500,
			density:0.7,
			friction:0.4,
			restitution:0.4,
		},
		"dirt":{
			density:3.0,
			friction:1.5,
			restitution:0.2,
		},
		"burger":{
			shape:"circle",
			fullHealth:40,
			radius:25,
			density:1,
			friction:0.5,
			restitution:0.4,
		},
		"sodacan":{
			shape:"rectangle",
			fullHealth:80,
			width:40,
			height:60,
			density:1,
			friction:0.5,
			restitution:0.7,
		},
		"fries":{
			shape:"rectangle",
			fullHealth:50,
			width:40,
			height:50,
			density:1,
			friction:0.5,
			restitution:0.6,
		},
		"apple":{
			shape:"circle",
			radius:25,
			density:1.5,
			friction:0.5,
			restitution:0.4,
		},
		"orange":{
			shape:"circle",
			radius:25,
			density:1.5,
			friction:0.5,
			restitution:0.4,
		},
		"strawberry":{
			shape:"circle",
			radius:15,
			density:2.0,
			friction:0.5,
			restitution:0.4,
		},
	},

	create:function(entity){
		var definition = entities.definitions[entity.name];
		if(!definition){
			console.log ("Undefined entity name",entity.name);
			return;
		}
		switch(entity.type){
			case "block":
				entity.health = definition.fullHealth;
				entity.fullHealth = definition.fullHealth;
				entity.shape = "rectangle";
				box2d.createRectangle(entity,definition);
				break;
			case "ground":
				entity.shape = "rectangle";
				box2d.createRectangle(entity,definition);
				break;
			case "hero":
			case "villain":
				entity.health = definition.fullHealth;
				entity.fullHealth = definition.fullHealth;
				entity.shape = definition.shape;
				if(definition.shape == "circle"){
					entity.radius = definition.radius;
					box2d.createCircle(entity,definition);
				} else if(definition.shape == "rectangle"){
					entity.width = definition.width;
					entity.height = definition.height;
					box2d.createRectangle(entity,definition);
				}
				break;
			default:
				console.log("Undefined entity type",entity.type);
				break;
		}
	},

	draw:function(entity,position,angle){
	}
}

var box2d = {
	scale:30,
	init:function(){
		var gravity = new b2Vec2(0,9.8);
		var allowSleep = true;
		box2d.world = new b2World(gravity,allowSleep);

		var debugContext = game.canvas.getContext('2d');
		var debugDraw = new b2DebugDraw();
		debugDraw.SetSprite(debugContext);
		debugDraw.SetDrawScale(box2d.scale);
		debugDraw.SetFillAlpha(0.25);
		debugDraw.SetLineThickness(1.0);
		debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
		box2d.world.SetDebugDraw(debugDraw);

		var listener = new Box2D.Dynamics.b2ContactListener;
		listener.PostSolve = function(contact,impulse){
			var body1 = contact.GetFixtureA().GetBody();
			var body2 = contact.GetFixtureB().GetBody();
			var entity1 = body1.GetUserData();
			var entity2 = body2.GetUserData();

			var impulseAlongNormal = Math.abs(impulse.normalImpulses[0]);
			if(impulseAlongNormal>5){
				if (entity1.health){
					entity1.health -= impulseAlongNormal;
				}

				if (entity2.health){
					entity2.health -= impulseAlongNormal;
				}

			}
		};
		box2d.world.SetContactListener(listener);
	},
	step:function(timeStep){
		box2d.world.Step(timeStep,8,3);
	},
	createRectangle:function(entity,definition){
			var bodyDef = new b2BodyDef;
			if(entity.isStatic){
				bodyDef.type = b2Body.b2_staticBody;
			} else {
				bodyDef.type = b2Body.b2_dynamicBody;
			}

			bodyDef.position.x = entity.x/box2d.scale;
			bodyDef.position.y = entity.y/box2d.scale;
			if (entity.angle) {
				bodyDef.angle = Math.PI*entity.angle/180;
			}

			var fixtureDef = new b2FixtureDef;
			fixtureDef.density = definition.density;
			fixtureDef.friction = definition.friction;
			fixtureDef.restitution = definition.restitution;

			fixtureDef.shape = new b2PolygonShape;
			fixtureDef.shape.SetAsBox(entity.width/2/box2d.scale,entity.height/2/box2d.scale);

			var body = box2d.world.CreateBody(bodyDef);
			body.SetUserData(entity);

			var fixture = body.CreateFixture(fixtureDef);
			return body;
	},

	createCircle:function(entity,definition){
			var bodyDef = new b2BodyDef;
			if(entity.isStatic){
				bodyDef.type = b2Body.b2_staticBody;
			} else {
				bodyDef.type = b2Body.b2_dynamicBody;
			}

			bodyDef.position.x = entity.x/box2d.scale;
			bodyDef.position.y = entity.y/box2d.scale;

			if (entity.angle) {
				bodyDef.angle = Math.PI*entity.angle/180;
			}
			var fixtureDef = new b2FixtureDef;
			fixtureDef.density = definition.density;
			fixtureDef.friction = definition.friction;
			fixtureDef.restitution = definition.restitution;

			fixtureDef.shape = new b2CircleShape(entity.radius/box2d.scale);

			var body = box2d.world.CreateBody(bodyDef);
			body.SetUserData(entity);

			var fixture = body.CreateFixture(fixtureDef);
			return body;
	},
}

var loader = {
	loaded:true,
	loadedCount:0,
	totalCount:0,

	init:function(){
	},
	loadImage:function(url,callback){
	},

	itemLoaded:function(e){
	},
	updateStatus:function(){
	}
};

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
