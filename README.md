# Evolution-simulator

This is an evolution simulator where creatures are trained to eat food. It uses neural networks utilizing the Neataptic.js library with a genetic algorithm called NEAT, which stands for neuroevolution of augmenting topologies. This alters both the weighting parameters and structures of networks, attempting to find a
balance between the fitness of evolved solutions and their diversity, which is an example of a topology and
weight evolving artificial neural network (TWEANN). Visualisation is done using P5.js and charts by Chart.js.

Evolution can typically be observed within 300 generations. The score should also increase. In order to maximise the speed of evolution, there is a default settings button which has settings that I have attempted to optimise. However all the settings can still be changed, which include:

* Number of creatures.
* Number of food.
* Detection radius (eyesight).
* Iterations (how long each generation lasts for).
* Mutation rate (percentage of creatures that will be mutated every generation)
* Number of hidden nodes at start (how many hidden nodes the neural networks will have when initialised).
* Elitism percentage (the percentage of the top performing creatures that get copied into the next generation).
* Mutation amount (the amount of times a mutation method will get applied to each neural network).

