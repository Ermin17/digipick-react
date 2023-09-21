// Function to shift the lockpick array to the right
export const shiftLockpickRight = (lockpick) => {
  const shiftedLockpick = [...lockpick]; // Create a copy of the lockpick array
  const lastValue = shiftedLockpick.pop(); // Remove the last element
  shiftedLockpick.unshift(lastValue); // Add the last value to the beginning
  return shiftedLockpick; // Return the new lockpick array
};

// Function to shift the lockpick array to the left
export const shiftLockpickLeft = (lockpick) => {
  const shiftedLockpick = [...lockpick]; // Create a copy of the lockpick array
  const firstValue = shiftedLockpick.shift(); // Remove the first element
  shiftedLockpick.push(firstValue); // Add the first value to the end
  return shiftedLockpick; // Return the new lockpick array
};