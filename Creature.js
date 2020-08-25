function Creature(genome) {
    this.x = Math.floor(Math.random() * 900);
    this.y = Math.floor(Math.random() * 800);
    this.velocityX = 0;
    this.velocityY = 0;
    
    /*score is under gene because the score needs to be attached to the specific weights of the network,
    there is an error otherwise*/
    this.genes = genome;
    this.genes.score = 0;
    this.points = 0;
    
    creatures.push(this);
}
  
Creature.prototype.move = function() {
    
    var input = this.detect();
    var output = this.genes.activate(input);
    
    var angle = output[0] * 2 * Math.PI;
    var speed; 
    if (output[1] > 1) {
        speed = 1;
    }
    else if (output[1] < 0) {
        speed = 0;
    }
    else {
        speed = output[1];
    }
        
    //https://stackoverflow.com/questions/22421054/determine-movement-vectors-direction-from-velocity
    this.velocityX = speed * Math.cos(angle) * SPEED;
    this.velocityY = speed * Math.sin(angle) * SPEED;
    
    this.x += this.velocityX;
    this.y += this.velocityY;

    //https://stackoverflow.com/questions/39606123/how-can-i-achieve-a-wraparound-effect-in-an-arcade-like-game
    // Limit position to width and height of canvas
    this.x = this.x >= 900 ? this.x % 900 : this.x <= 0 ? this.x + 900 : this.x;
    this.y = this.y >= 800 ? this.y % 800 : this.y <= 0 ? this.y + 800 : this.y;

    //points are lost every frame
    this.points *= 0.99;
    this.genes.score = this.points;
    highestScore = this.genes.score > highestScore ? this.genes.score : highestScore;
}
  
Creature.prototype.show = function() {
    fill('rgb(0,0,255)');
    noStroke();
    ellipse(this.x, this.y, 15); 
}
  
Creature.prototype.eat = function(food) {
    var distance1 = distance(this.x, this.y, food.x, food.y);
    //distance so small they're pretty much overlapping - collision detection
    if (distance1 < 10) {
      this.points += 10;
      food.restart();
      return true;
    }
    return false;
}
  
Creature.prototype.detect = function() {
    
    // Detect nearest foods
    var nearestFoods = [];
    //makes an array the size of foodDetection and add infinity to the values
    var foodDistances = Array.apply(null, Array(foodDetection)).map(Number.prototype.valueOf, Infinity);
    
    for(var food1 in food){
        food1 = food[food1];
        if(this.eat(food1)) continue;
    
        var dist = distance(this.x, this.y, food1.x, food1.y);
        if(dist < detectionRadius){
        // Check if closer than any other object
        var maxNearestDistance = Math.max.apply(null, foodDistances);
        var index = foodDistances.indexOf(maxNearestDistance);
        
            if(dist < maxNearestDistance){
            foodDistances[index] = dist;
            nearestFoods[index] = food1;
            }
        }
    }
    
    // Create and normalize input
    var output = [];
    
    for(var i = 0; i < foodDetection; i++){
        var food1 = nearestFoods[i];
        var dist = foodDistances[i];
        
        if(food1 == undefined){
        output = output.concat([0, 0]);
        } 
        else {
            //output is an array, each of the following inputs the angle and distance to the network
            output.push(angleToPoint(this.x, this.y, food1.x, food1.y) / (2 * PI));
            output.push(dist / detectionRadius);
        }
    }

    if(distance(mouseX, mouseY, this.x, this.y) < 15){
        noFill();
        stroke(0);
        ellipse(this.x, this.y, detectionRadius*2);
    }
    console.log(output);
    return output;
}




  