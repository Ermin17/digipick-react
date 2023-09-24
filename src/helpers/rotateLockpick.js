// Function to shift the lockpick array to the right
export const shiftLockpickRight = (lockpick) => {
  const shiftedLockpick = [...lockpick];
  const lastValue = shiftedLockpick.pop();
  shiftedLockpick.unshift(lastValue);
  return shiftedLockpick;
};

// Function to shift the lockpick array to the left
export const shiftLockpickLeft = (lockpick) => {
  const shiftedLockpick = [...lockpick];
  const firstValue = shiftedLockpick.shift();
  shiftedLockpick.push(firstValue);
  return shiftedLockpick;
};