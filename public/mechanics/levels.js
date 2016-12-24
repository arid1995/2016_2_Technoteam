(function() {
var box2d = require('./box2d').box2d;
var loader = require('./loader').loader;
var entities = require('./entities').entities;

var levels = {
  game: {},
	data:[
	 {
		entities:[]
	 },
	],

	init:function(_game){
    game = _game;
    levels.data[0].entities = [
      {type:"ground", name:"dirt", x:canvas.width / 2 ,y:canvas.height - 10,width:canvas.width,
          height:20,isStatic:true},
      {type:"ground", name:"wood", x:game.slingshotX[0]+40,y:canvas.height - 50, width:10,height:60,isStatic:true},
      {type:"ground", name:"wood", x:game.slingshotX[1]+40,y:canvas.height - 50,width:10,height:60,isStatic:true},

      {type:"block", name:"wood", x:320,y:canvas.height - 170,angle:90,width:100,height:25},
      {type:"block", name:"glass", x:320,y:canvas.height - 70,angle:90,width:100,height:25},
      {type:"villain", name:"burger",x:320,y:canvas.height - 270,calories:50},

      {type:"block", name:"wood", x:820,y:canvas.height - 170,angle:90,width:100,height:25},
      {type:"block", name:"glass", x:820,y:canvas.height - 70,angle:90,width:100,height:25},
      {type:"villain", name:"fries", x:820,y:canvas.height - 270,calories:40},

      {type:"hero", name:"orange",x:80,y:canvas.height - 270},
      {type:"hero", name:"apple",x:140,y:canvas.height - 270},
    ];
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

exports.levels = levels;
})();
