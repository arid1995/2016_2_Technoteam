function game() {

  const PIG = 1;
  const BIRD = 2;
  const PLANK = 3;
  var arrOfBodies = new Array();

  isMouseDown = false;
  mouseJoint = false;

  body = false;
  mousePosition = {x:0,y:0};

  b2AABB  = Box2D.Collision.b2AABB;
  b2World = Box2D.Dynamics.b2World;
  b2Vec2 = Box2D.Common.Math.b2Vec2;
  b2DebugDraw = Box2D.Dynamics.b2DebugDraw;
  b2Body = Box2D.Dynamics.b2Body;
  b2BodyDef = Box2D.Dynamics.b2BodyDef;
  b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
  b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
  b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
  b2MouseJointDef = Box2D.Dynamics.Joints.b2MouseJointDef;
  b2ContactListener = Box2D.Dynamics.b2ContactListener;

  world =  new b2World(
      new b2Vec2(0, 10)
     ,true
   );


  init = function() {
    buildWorld();
    initDraw();
    bindMouse();

    window.setInterval(update, 1000 / 60);
  }

  update = function() {
    world.Step(1/60, 10, 10);
    world.DrawDebugData();
    world.ClearForces();

    if(isMouseDown) {
      if(!(body)) {
        mousePosition = {x:mouseX, y:mouseY};
        createPig(mouseX, mouseY, 1);
        body = getBodyAtMouse();

        md = new b2MouseJointDef();
        md.bodyA = world.GetGroundBody();
        md.bodyB = body;
        md.target.Set(mousePosition.x, mousePosition.y);
        md.collideConnected = true;
        md.maxForce = 300.0 * body.GetMass();
        mouseJoint = world.CreateJoint(md);
        body.SetAwake(true);
      }

      body.SetPosition(new b2Vec2(mouseX, mouseY));
    }

    if(mouseJoint && !isMouseDown) {
            mouseX = mousePosition.x;
            mouseY = mousePosition.y;
            if(getBodyAtMouse()) {
              world.DestroyJoint(mouseJoint);
              mouseJoint = null;
              body = false;
            }
    }

    //for(var i in arrOfBodies){
      /*if (arrOfBodies[0] && arrOfBodies[0].isSleeping == true)
        Console.log("sleep");
        world.DestroyBody(arrOfBodies[i]);
        arrOfBodies[i] = null;*/
    //}
  }

  initDraw = function() {
    debugDraw = new b2DebugDraw();

    debugDraw.SetSprite(document.getElementById("canvas").getContext("2d"));
    debugDraw.SetDrawScale(30.0);
    debugDraw.SetFillAlpha(0.5);
    debugDraw.SetLineThickness(1.0);
    debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
    world.SetDebugDraw(debugDraw);
  }

  buildWorld = function() {
    fixDef = new b2FixtureDef();

    fixDef.density = 1.0;
    fixDef.friction = 0.5;
    fixDef.restitution = 0.2;

    bodyDef = new b2BodyDef();
    bodyDef.type = b2Body.b2_staticBody;

    fixDef.shape = new b2PolygonShape;
    fixDef.shape.SetAsBox(30, 5);
    bodyDef.position.Set(10, 600 / 30+1.8);
    world.CreateBody(bodyDef).CreateFixture(fixDef);

    fixDef.shape = new b2PolygonShape;
    fixDef.shape.SetAsBox(4, 10);
    bodyDef.position.Set(4, 600 / 30+1.8);
    world.CreateBody(bodyDef).CreateFixture(fixDef);

    fixDef.shape = new b2PolygonShape;
    fixDef.shape.SetAsBox(4, 10);
    bodyDef.position.Set(36, 600 / 30+1.8);
    world.CreateBody(bodyDef).CreateFixture(fixDef);

    canvasPosition = $("#canvas").offset();
  }

  PigData = function() {};
  PigData.prototype.GetType = function() {
    return PIG;
  }

  PlankData = function() {}

  buildLevel = function() {
    createPlank(22, 20, 0.25, 2)

    //createPig(20,11,0.5);
  }

  createPlank = function(x,y, width, height) {
    bodyDef.type = b2Body.b2_dynamicBody;
    fixDef.shape = new b2PolygonShape;
    fixDef.shape.SetAsBox (
         width
      ,  height
    );

    bodyDef.position.x = x;
    bodyDef.position.y = y;
    plank = world.CreateBody(bodyDef);
    plank.SetUserData(new PlankData());
    plank.CreateFixture(fixDef);
  }

  createPig = function(x, y, r) {
    bodyDef.type = b2Body.b2_dynamicBody;
    fixDef.shape = new b2CircleShape(r);
    bodyDef.position.x = x;
    bodyDef.position.y = y;
    pig = world.CreateBody(bodyDef);
    pig.isSleeping = false;
    //arrOfBodies.push(bodyDef);
    pig.SetUserData(new PlankData());
    pig.CreateFixture(fixDef);


  }

  init();
  createPlank(20, 10, 1, 1);
}

bindMouse = function() {
  $(document).mousedown(function(e){
    isMouseDown = true;
    handleMouse(e);
    $(document).bind("mousemove", {}, handleMouse);
  });

  $(document).mouseup(function(e){
    isMouseDown = false;
    $(document).unbind("mousemove");
  });
}

handleMouse = function(e) {
    mouseX = (e.clientX - canvasPosition.left) / 30;
    mouseY = (e.clientY - canvasPosition.top) / 30;
};

function getBodyAtMouse() {
  mousePVec = new b2Vec2(mouseX, mouseY);

  var aabb = new b2AABB();
  aabb.lowerBound.Set(mouseX - 0.001, mouseY - 0.001);
  aabb.upperBound.Set(mouseX + 0.001, mouseY + 0.001);

  selectedBody = null;
  world.QueryAABB(getBodyCallback, aabb);
  return selectedBody;
}

getBodyCallback = function(fixture) {
    if(fixture.GetBody().GetType() != b2Body.b2_staticBody) {
       if(fixture.GetShape().TestPoint(fixture.GetBody().GetTransform(), mousePVec)) {
          selectedBody = fixture.GetBody();
          return false;
       }
    }
    return true;
}
