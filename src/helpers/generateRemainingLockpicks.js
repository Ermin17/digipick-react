// This will generate purely random lockpicks for the remaining spots
const generateRemainingLockpicks = (difficulty) => {
  // Limit the remaining lockpicks to total - number of lockpicks set by difficulty
  // Ex: Novice has 2 solutions but 4 total lockpicks so generate 2 remaining lockpicks
  var numberOfSolutions;
  var randomSolutions = [];
  var maxZeros = 4;
  var zerosCount = 0;
  var solutionCount = 0;

  if (difficulty === 'novice') {
    numberOfSolutions = 2;
  } else if (difficulty === 'advanced') {
    numberOfSolutions = 4;
  } else if (difficulty === 'expert') {
    numberOfSolutions = 6;
  } else if (difficulty === 'master') {
    numberOfSolutions = 8;
  }

  // 1 references a 0 here as the lock and lockpickpick arrays are flipped
  while (solutionCount < numberOfSolutions) {
    var newLockpick = [];
    for (var i = 0; i < 20; i++) {
      if (zerosCount < maxZeros && Math.random() > 0.5) {
        newLockpick.push(1);
        zerosCount++;
      } else {
        newLockpick.push(0);

      }

    }

    // Ensure there is at least 1 zero
    var randomIndex = Math.floor(Math.random() * 20);
    newLockpick[randomIndex] = 1;
    randomSolutions.push(newLockpick);
    solutionCount++;

  }

  return randomSolutions;

};

module.exports = generateRemainingLockpicks;