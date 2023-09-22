import React, {useState, useEffect} from 'react';
import SelectedLockpick from './SelectedLockpick.js';
import { shiftLockpickRight, shiftLockpickLeft } from '../helpers/rotateLockpick.js';
import { useLockpickContext } from './LockpickContext';
import { checkLockpickPlacement } from '../helpers/checkLockpickPlacement.js';
import '../styles.css';

const CircularLock = ({ numLocks, arrayOfLocks, setArrayOfLocks, allRemainingLockpicks, setAllRemainingLockpicks, chosenDifficulty }) => {
  const lockArray = [
    1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1
  ];

  const { selectedLockpick, setSelectedLockpick } = useLockpickContext();

  const gapSize = 8; // Adjust the size of the gap
  const maxRadius = Math.min(500, 1000) / 2; // Increase the radius value to make the circle appear larger
  const centerX = maxRadius; // X-coordinate of the circle's center
  const centerY = maxRadius; // Y-coordinate of the circle's center
  const stepAngle = (2 * Math.PI) / lockArray.length; // Angle between each step

  const [currentLockIndex, setCurrentLockIndex] = useState(0);
  const [selectedLocks, setSelectedLocks] = useState(arrayOfLocks);
  const [showCongrats, setShowCongrats] = useState(false);
  const [remainingLockpicks, setRemainingLockpicks] = useState(allRemainingLockpicks);

  useEffect(() => {
    setSelectedLocks(arrayOfLocks);
    setShowCongrats(false);
  }, [arrayOfLocks]);

  useEffect(() => {
    setSelectedLockpick(allRemainingLockpicks[0]);
  }, [chosenDifficulty]);

  const locks = selectedLocks.map((lock, i) => {
    const radius = maxRadius - i * gapSize * 2;
    const pathData = lock.map((value, index) => {
      if (value === 1) {
        const startAngle = stepAngle * index;
        const endAngle = stepAngle * (index + 1);
        const x1 = centerX + radius * Math.cos(startAngle);
        const y1 = centerY + radius * Math.sin(startAngle);
        const x2 = centerX + radius * Math.cos(endAngle);
        const y2 = centerY + radius * Math.sin(endAngle);
        return `M ${x1},${y1} A ${radius},${radius} 0 0,1 ${x2},${y2}`;
      } else {
        return null;
      }
    }).join(` M ${centerX},${centerY} m ${-gapSize},${-gapSize}`);

    return (
      <path
        key={i}
        d={pathData}
        fill='none'
        stroke='aliceblue'
        strokeWidth='8'
      />
    );
  });

  const svgWidth = maxRadius * 2 + gapSize * 30; // Calculate the SVG width
  const svgHeight = maxRadius * 2 + gapSize * 30; // Calculate the SVG height

  const updateRemainingLockpicks = (shiftedLockpick) => {
    const indexToUpdate = allRemainingLockpicks.findIndex((lockpick) => {
      return arraysEqual(lockpick, selectedLockpick);
    });

    if (indexToUpdate !== -1) {
      console.log(allRemainingLockpicks);
      const updatedRemainingLockpicks = [...allRemainingLockpicks];
      updatedRemainingLockpicks[indexToUpdate] = shiftedLockpick;
      setAllRemainingLockpicks(updatedRemainingLockpicks);
    }
    setSelectedLockpick(shiftedLockpick)
  };


  const arraysEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }
    return true;
  }


  const shiftRight = () => {
    const shiftedLockpick = shiftLockpickRight(selectedLockpick);
    updateRemainingLockpicks(shiftedLockpick);
  };


  const shiftLeft = () => {
    const shiftedLockpick = shiftLockpickLeft(selectedLockpick);
    updateRemainingLockpicks(shiftedLockpick);
  };

  const checkAndUpdateLock = () => {
    if (checkLockpickPlacement(selectedLocks[currentLockIndex], selectedLockpick)) {
      // Handle the correct placement
      console.log('Correct!');
      console.log(selectedLocks);

      setSelectedLocks(prevLocks => {
        const updatedLocks = [...prevLocks];
        updatedLocks[currentLockIndex] = selectedLockpick.map((value, index) =>
          value || updatedLocks[currentLockIndex][index]
        );

        // Check if the current lock is complete (all 1s)
        const isCurrentLockComplete = updatedLocks[currentLockIndex].every(value => value === 1);

        if (isCurrentLockComplete) {
          // Remove the current lock from the array
          updatedLocks.splice(currentLockIndex, 1);

          // Update the currentLockIndex if it exceeds the array length
          if (currentLockIndex >= updatedLocks.length) {
            setCurrentLockIndex(updatedLocks.length - 1);

            if (updatedLocks.length === 0) {
              setShowCongrats(true);
            }
          }
        }

        return updatedLocks;
      });

      // Remove the used lockpick from remainingLockpicks
      setAllRemainingLockpicks((prevRemainingLockpicks) =>
      prevRemainingLockpicks.filter((lockpick) => lockpick !== selectedLockpick));

      setAllRemainingLockpicks((prevAllRemainingLockpicks) =>
        prevAllRemainingLockpicks.filter((lockpick) => lockpick !== selectedLockpick));

      setSelectedLockpick(remainingLockpicks[0]);

    } else {
      // Handle incorrect placement
      console.log('Try again!');

    }
  };



  return (
  <>
    <div className='centered-lock-container'>
      <svg width={svgWidth} height={svgHeight}>
        <g transform={`translate(${(svgWidth - (maxRadius * 2 + gapSize * 2)) / 2}, ${(svgHeight - (maxRadius * 2 + gapSize * 2)) / 2})`}>
          {locks}
          <SelectedLockpick selectedLockpick={selectedLockpick} />
          {showCongrats && (
            <text x={svgWidth / 4} y={svgHeight / 2} fontSize={24} fill='white'>
              Congrats for Unlocking the Lock!
            </text>
          )}
        </g>
        {/* Input elements within the SVG */}
        <foreignObject x={0} y={0} width={svgWidth} height={svgHeight}>
          <div className="input-container">
            <input type='button' value='Shift Left' onClick={shiftLeft} />
            <input type='button' value='Shift Right' onClick={shiftRight} />
            <input type='button' value='Slot' onClick={checkAndUpdateLock} />
          </div>
        </foreignObject>
      </svg>
    </div>
  </>
);


};

export default CircularLock;
