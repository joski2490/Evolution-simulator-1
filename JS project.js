var players = [];
var food = [];
var iteration = 0;
var highestScore = 0;

function setup() {
    var canvas = createCanvas(900, 800);
    canvas.id('canvas');

    // Triggers food spawning and limits amount of food
    for(var i = 0; i < 10; i++){
    // As food is an object, 'new' calls in a new instance of food
    new Food();
    }
}


function Food() {
  // Creates random coordinates for food
  this.x = Math.floor(Math.random() * 900);
  this.y = Math.floor(Math.random() * 800);
  // 'Push' adds 1 food particle to the array
  food.push(this);
}

//Food is an object - the show function defines what the food looks like
Food.prototype.show = function() {
  fill('rgb(0,255,0)');
  noStroke();
  ellipse(this.x, this.y, 10); 
}

/* 'Draw()' is part of P5.js and continually executes the lines of code 
within it after the 'setup()' function has been triggered*/
function draw() {
  for(var i = food.length - 1; i >= 0; i--){
    food[i].show();
  }
}








