// This will generate the lockpicks that can solve the puzzle
const generateSolution = (lockArray) => {
  var lockpickArray;

  for (let i = 1; i < lockArray.length - 5; i++) {
    var randomShift = Math.floor(Math.random() * i);
    var randomizedLockpickArray = randomizeSolutionPlacement(lockArray, randomShift);

    lockpickArray = randomizedLockpickArray.map((value) => (value === 0 ? 1 : 0));

  }

  return lockpickArray;
};

const randomizeSolutionPlacement = (lockpicksArray, positions) => {
  var randomizedPlacement = [...lockpicksArray];

  for (let i = 0; i < positions; i++) {
    var lastElement = randomizedPlacement.pop();
    randomizedPlacement.unshift(lastElement);
  }

  return randomizedPlacement;
};


module.exports = generateSolution;