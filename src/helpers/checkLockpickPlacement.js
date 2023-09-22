// This function will run to check if the lockpick can be placed
export const checkLockpickPlacement = (currentLock, selectedLockpick) => {
  var isCorrect = false;

  for (let i = 0; i < currentLock.length; i++) {
    // Breaks at the first instance of an index matching
    if (currentLock[i] === 1 && selectedLockpick[i] === 1) {
      return isCorrect;
    }
  }

  isCorrect = true;

  return isCorrect;
};