/** Rename vars */
var Neat = neataptic.Neat;
var Methods = neataptic.Methods;
var Config = neataptic.Config;
var Architect = neataptic.Architect;

/** Settings */
var detectionRadius = 150;
var foodDetection  = 3;

var minSpeed = 0.6;
var speed = 3;

var foodArea = 80;
var foodAmount = 500;

// GA settings
var creatureAmount = 50;
var iterations = 100;
var startHiddenSize = 0;
var mutationRate1 = 0.3;
var elitismPercentage = 0.1;


// Global vars
var neat;

/** Construct the genetic algorithm */
function initNeat(){
  neat = new Neat(1 + foodDetection * 2, 2, null,
    {
      //array of mutation types to be used in evolutionary process
      mutation: Methods.Mutation.ALL,
      popsize: creatureAmount,
      mutationRate: mutationRate1,
      elitism: Math.round(elitismPercentage * creatureAmount),
      network: new Architect.Random(1 + foodDetection * 2, startHiddenSize, 2)
    }
  );
}

/** Start the evaluation of the current generation */
function startEvaluation(){
    creatures = [];
    highestScore = 0;
  
    for(var genome in neat.population){ 
      genome = neat.population[genome];
      new Creature(genome);
    }
}

/** End the evaluation of the current generation */
function endEvaluation(){
    console.log('Generation:', neat.generation, '- average score:', neat.getAverage());
  
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
  
  

