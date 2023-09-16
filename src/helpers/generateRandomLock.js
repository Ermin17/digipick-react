// This will generate a random array to be used for the lock
const generateLockArray = () => {
  const maxLength = 20;
  const maxZeros = 4;

  // Generate a random number between 0 and maxZeros (inclusive) to determine the number of zeros in the array
  const numZeros = Math.floor(Math.random() * maxZeros) + 1;

  // Calculate the number of ones in the array
  const numOnes = maxLength - numZeros;

  // Create an Array with numZeros zeros and numOnes ones
  const lockArray = Array.from({ length: numZeros }, () => 0).concat(Array.from({ length: numOnes }, () => 1));

  // Shuffle the array randomly to distribute the zeros and ones
  for (let i = lockArray.length - 2; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    [lockArray[i], lockArray[j]] = [lockArray[j], lockArray[i]];
  }

  return lockArray;
};

// This will generate an array of locks to be rendered based on difficulty
const generateArrayOfLocks = (difficulty) => {
  var numberOfLocks;
  if (difficulty === 'novice') {
    numberOfLocks = 2;
  } else if (difficulty === 'advanced') {
    numberOfLocks = 2;
  } else if (difficulty === 'expert') {
    numberOfLocks = 3;
  } else if (difficulty === 'master') {
    numberOfLocks = 4;
  }

  var lockArray = [];
  for (let i = 0; i < numberOfLocks; i++) {
    var newRandomLock = generateLockArray();
    lockArray.push(newRandomLock);
  }

  return lockArray;
};

generateArrayOfLocks('novice');