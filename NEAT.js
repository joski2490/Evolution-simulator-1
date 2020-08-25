var detectionRadius = 150;
var foodDetection  = 3;

var foodAmount = 150;

var SPEED = 3;

var creatureAmount = 20;
var iterations = 600;
var startHiddenSize = 5;
var mutationRate1 = 0.3;
var elitismPercentage = 0.1;

var neat;

var generation;
var score;

//so I don't get annoying messages
neataptic.Config.warnings = false;

// Construct the genetic algorithm
function initNeat(){
  //foodDetection is *2 because the angle and distance of food needs to be inputted
  neat = new neataptic.Neat(foodDetection * 2, 2, null,
    {
      mutation: neataptic.Methods.Mutation.ALL,
      popsize: creatureAmount,
      mutationRate: mutationRate1,
      elitism: Math.round(elitismPercentage * creatureAmount),
      network: new neataptic.Architect.Random(foodDetection * 2, startHiddenSize, 2)
    }
  );
}

//Start the evaluation of the current generation
function startEvaluation(){
    creatures = [];
    highestScore = 0;
  
    for(var genome in neat.population){ 
      genome = neat.population[genome];
      new Creature(genome);
    }
}

//End the evaluation of the current generation
function endEvaluation(){
    console.log('Generation:', neat.generation, '- average score:', neat.getAverage());
    
    //for graph
    generation = neat.generation;
    score = neat.getAverage();
    addData(chart, generation, score)
    addData(chart2, generation, highestScore)
    neat.sort();
    var newPopulation = [];
  
    // Elitism
    for(var i = 0; i < neat.elitism; i++){
      newPopulation.push(neat.population[i]);
    }
  
    // Breed the next individuals
    for(var i = 0; i < neat.popsize - neat.elitism; i++){
      newPopulation.push(neat.getOffspring());
    }
  
    // Replace the old population with the new population
    neat.population = newPopulation;
    neat.mutate();
  
    neat.generation++;
    startEvaluation();
}
