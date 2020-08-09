function Food() {
  // Creates random coordinates for food
  this.x = Math.floor(Math.random() * 900);
  this.y = Math.floor(Math.random() * 800);
  // 'Push' adds 1 food particle to the array
  food.push(this);
}

//Food is an object - the show function defines what the food looks like
Food.prototype =  {
    show: function() {
        fill('rgb(0,255,0)');
        noStroke();
        ellipse(this.x, this.y, 8); 
    }
}