(function() {
  const Box2D = require('./Box2dWeb-2.1.a.3.min').Box2D;
  var b2Vec2 = Box2D.Common.Math.b2Vec2;
  var b2BodyDef = Box2D.Dynamics.b2BodyDef;
  var b2Body = Box2D.Dynamics.b2Body;
  var b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
  var b2Fixture = Box2D.Dynamics.b2Fixture;
  var b2World = Box2D.Dynamics.b2World;
  var b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
  var b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
  var b2DebugDraw = Box2D.Dynamics.b2DebugDraw;

  var box2d = {
  	scale:30,
    canvas: {},
    setCanvas: function(_canvas) {
      canvas = _canvas
    },
  	init:function(){
  		var gravity = new b2Vec2(0,9.8);
  		var allowSleep = true;
  		box2d.world = new b2World(gravity,allowSleep);

  		var debugContext = canvas.getContext('2d');
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

  exports.box2d = box2d;
})();
