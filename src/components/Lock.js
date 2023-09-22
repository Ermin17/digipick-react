import React, {useState, useEffect} from 'react';
import SelectedLockpick from './SelectedLockpick.js';
import { shiftLockpickRight, shiftLockpickLeft } from '../helpers/rotateLockpick.js';
import { useLockpickContext } from './LockpickContext';
import { checkLockpickPlacement } from '../helpers/checkLockpickPlacement.js';
import '../styles.css';

const CircularLock = ({ numLocks, arrayOfLocks, setArrayOfLocks }) => {
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

  useEffect(() => {
    setSelectedLocks(arrayOfLocks);
    setShowCongrats(false);
  }, [arrayOfLocks]);

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


  const shiftRight = () => {
    const shiftedLockpick = shiftLockpickRight(selectedLockpick);
    setSelectedLockpick(shiftedLockpick);
  };


  const shiftLeft = () => {
    const shiftedLockpick = shiftLockpickLeft(selectedLockpick);
    setSelectedLockpick(shiftedLockpick);
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
    } else {
      // Handle incorrect placement
      console.log('Try again!');
      console.log(selectedLocks);
      // Optionally, you can reset the lock state or take other actions here.
      // For example, you can show a message indicating that the lock is reset.
    }
  };



  return (
    <>
      <div className='centered-lock-container'>
        <input type='button' value='Shift Left' onClick={shiftLeft} />
        <input type='button' value='Shift Right' onClick={shiftRight} />
        <input type='button' value='Slot' onClick={checkAndUpdateLock} />
        <svg width={svgWidth} height={svgHeight}> {/* Increase the width and height to accommodate the larger circle */}
          <g transform={`translate(${(svgWidth - (maxRadius * 2 + gapSize * 2)) / 2}, ${(svgHeight - (maxRadius * 2 + gapSize * 2)) / 2})`}>
            {locks}
            <SelectedLockpick selectedLockpick={selectedLockpick} />
            {showCongrats && (
              <text x={svgWidth / 4} y={svgHeight / 2} fontSize={24} fill='white'>
                Congrats for Unlocking the Lock!
              </text>
            )}
          </g>
        </svg>
      </div>
    </>
  );
};

export default CircularLock;
