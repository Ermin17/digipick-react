import React, {useState, useEffect} from 'react';
import SelectedLockpick from './SelectedLockpick.js';
import { shiftLockpickRight, shiftLockpickLeft } from '../helpers/rotateLockpick.js';
import { useLockpickContext } from './LockpickContext';
import { checkLockpickPlacement } from '../helpers/checkLockpickPlacement.js';
import '../styles.css';

const CircularLock = ({ numLocks, arrayOfLocks, allRemainingLockpicks, setAllRemainingLockpicks, chosenDifficulty, isChanging, setShowCongrats }) => {

  const { selectedLockpick, setSelectedLockpick } = useLockpickContext();

  const gapSize = 20; // Adjust the size of the gap
  const maxRadius = Math.min(500, 1000) / 2;
  const centerX = maxRadius;
  const centerY = maxRadius;
  const stepAngle = (2 * Math.PI) / 20; // Angle between each step

  const [currentLockIndex, setCurrentLockIndex] = useState(0);
  const [selectedLocks, setSelectedLocks] = useState(arrayOfLocks);

  useEffect(() => {
    setSelectedLockpick(allRemainingLockpicks[0]);
    setCurrentLockIndex(0);
  }, [chosenDifficulty, isChanging]);

  useEffect(() => {
    setSelectedLocks(arrayOfLocks);
  }, [currentLockIndex, arrayOfLocks]);

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
        strokeWidth='15'
        strokeDasharray='30, .5'
      />
    );
  });

  const svgWidth = maxRadius * 2 + gapSize * 30;
  const svgHeight = maxRadius * 2 + gapSize * 30;

  const updateRemainingLockpicks = (shiftedLockpick) => {
    const indexToUpdate = allRemainingLockpicks.findIndex((lockpick) => {
      return arraysEqual(lockpick, selectedLockpick);
    });

    if (indexToUpdate !== -1) {
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
      console.log('Correct!');

      setSelectedLocks(prevLocks => {
        const updatedLocks = [...prevLocks];
        updatedLocks[currentLockIndex] = selectedLockpick.map((value, index) =>
          value || updatedLocks[currentLockIndex][index]
        );

        const isCurrentLockComplete = updatedLocks[currentLockIndex].every(value => value === 1);

        if (isCurrentLockComplete) {

          updatedLocks.splice(currentLockIndex, 1);

          if (currentLockIndex >= updatedLocks.length) {
            setCurrentLockIndex(updatedLocks.length - 1);

            if (updatedLocks.length === 0) {
              setShowCongrats(true);
            }
          }
        }

        return updatedLocks;

      });

      setAllRemainingLockpicks((prevAllRemainingLockpicks) =>
        prevAllRemainingLockpicks.filter((lockpick) => lockpick !== selectedLockpick));

      setSelectedLockpick(allRemainingLockpicks[0]);

    } else {
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
          </g>
          <foreignObject x={0} y={0} width={svgWidth} height={svgHeight}>
            <div className="input-container">
              <input type='button' value='Move Left' onClick={shiftLeft} />
              <input type='button' value='Move Right' onClick={shiftRight} />
              <input type='button' value='Slot' onClick={checkAndUpdateLock} />
            </div>
          </foreignObject>
        </svg>
      </div>
    </>
  );


};

export default CircularLock;
