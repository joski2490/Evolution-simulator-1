var creatures = [];
var food = [];
var iteration = 0;
var highestScore = 0;

function setup() {
  var canvas = createCanvas(900, 800);
  
  canvas.id('canvas');
  canvas.position(10,100);
  initNeat();
  // Triggers food spawning and limits amount of food
  for(var i = 0; i < foodAmount; i++){
  // As food is an object, 'new' calls in a new instance of food
  new Food();
  }

  for(var i = 0; i < 100; i++) neat.mutate();

  startEvaluation();
}
//Do update function next/creature functions. Ideally make creatures move, without nn for now.
//All in Draw function

/* 'Draw()' is part of P5.js and continually executes the lines of code 
within it after the 'setup()' function has been triggered*/

function draw() {
  //makes sure the creature actually appears to move and doesnt leave a trail of where it was before
  clear();

  // Check if evaluation is done
  if(iteration == iterations){
    endEvaluation();
    iteration = 0;
  }
  for(var i = food.length - 1; i >= 0; i--){
    food[i].show();
  }
  for(var i = creatures.length - 1; i >= 0; i--){
    //refresh updates statistics
    creatures[i].refresh();
    //show then reflects these changes onto the canvas
    creatures[i].show();
  }

  iteration++ /*adding the iteration counter here is useful because
  the code here is continually looped. This means I don't have to try
  and implement timer functions which are designed to execute code after a delay*/
}

function Creature(genome) {
  this.x = Math.floor(Math.random() * 900);
  this.y = Math.floor(Math.random() * 800);
  this.velocityX = 0;
  this.velocityY = 0;
  
  /*score is under gene because the score needs to be attached to the specific weights of the network,
  there is an error otherwise*/
  this.genes = genome;
  this.score = 0;

  creatures.push(this);
}

Creature.prototype.refresh = function() {

  //angle needs to be connected to nn, it is fixed for test
  var angle = 50;
  var speed = 0.5;
  
  //https://stackoverflow.com/questions/22421054/determine-movement-vectors-direction-from-velocity
  this.velocityX = speed * Math.cos(angle);
  this.velocityY = speed * Math.sin(angle);
  
  this.x += this.velocityX;
  this.y += this.velocityY;
}

//Restart from new position
Creature.prototype.restart = function() {
  this.x = Math.floor(Math.random() * 900);
  this.y = Math.floor(Math.random() * 800);
  this.velocityX = 0;
  this.velocityX = 0;
}

Creature.prototype.show = function() {
  fill('rgb(0,0,255)');
  noStroke();
  ellipse(this.x, this.y, 15); 
}

Creature.prototype.eat = function(food) {
  var distance = distance(this.x, this.y, food.x, food.y);
  //distance so small they're pretty much overlapping - collision detection
  if (distance < 10) {
    //score increases here
    food.restart();
  }
}

//distance between food and creature
function distance(x1, x2, y1, y2) {
  var distanceX = x2-x1;
  var distanceY = y2-y1;
  return distanceX * distanceX + distanceY * distanceY;
  //https://stackoverflow.com/questions/20916953/get-distance-between-two-points-in-canvas
}







