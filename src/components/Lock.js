import React from 'react';
import {useState} from 'react';
import { shiftLockpickRight, shiftLockpickLeft } from '../helpers/rotateLockpick.js';
import '../styles.css';

const CircularLock = ({numLocks, arrayOfLocks, arrayOfLockpicks}) => {
  const lockArray = [
    1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1
  ];

  const [selectedLockpick, setSelectedLockpick] = useState(arrayOfLockpicks[0]);

  const gapSize = 8; // Adjust the size of the gap
  const maxRadius = Math.min(500, 1000) / 2; // Increase the radius value to make the circle appear larger
  const centerX = maxRadius; // X-coordinate of the circle's center
  const centerY = maxRadius; // Y-coordinate of the circle's center

  const stepAngle = (2 * Math.PI) / lockArray.length; // Angle between each step

  const locks = [];

  for (let i = 0; i < numLocks; i++) {
    const radius = maxRadius - i * gapSize * 2; // Decrease the radius for each inner circle

    const pathData = arrayOfLocks[i].map((value, index) => {
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

    locks.push(
      <path
      key={i}
      d={pathData}
      fill='none'
      stroke='aliceblue'
      strokeWidth='8'
      />
    );
  }

  const lockpickPath = selectedLockpick.map((value, index) => {
    if (value === 1) {
      const radius = maxRadius * 1.1; // Use the same radius for each circle
      const startAngle = stepAngle * index;
      const endAngle = stepAngle * (index + 1);
      const x1 = centerX + radius * Math.cos(startAngle);
      const y1 = centerY + radius * Math.sin(startAngle);
      const x2 = centerX + radius * Math.cos(endAngle);
      const y2 = centerY + radius * Math.sin(endAngle);

      return (
        <path
          key={index}
          d={`M ${x1},${y1} A ${radius},${radius} 0 0,1 ${x2},${y2}`}
          fill='none'
          stroke='red'
          strokeWidth='8'
        />
      );
    } else {
      return null;
    }
  });

  const svgWidth = maxRadius * 2 + gapSize * 30; // Calculate the SVG width
  const svgHeight = maxRadius * 2 + gapSize * 30; // Calculate the SVG height

  var handleLockpickSelection = (lockpick) => {
    setSelectedLockpick(lockpick);
    console.log(selectedLockpick);
  };


  const shiftRight = () => {
    const shiftedLockpick = shiftLockpickRight(selectedLockpick);
    setSelectedLockpick(shiftedLockpick);
  };


  const shiftLeft = () => {
    const shiftedLockpick = shiftLockpickLeft(selectedLockpick);
    setSelectedLockpick(shiftedLockpick);
  };

  return (
    <>
      <div className='centered-lock-container'>
        <input type='button' value='Shift Right' onClick={shiftRight}/>
        <input type='button' value='Shift Left' onClick={shiftLeft}/>
        <svg width={svgWidth} height={svgHeight}> {/* Increase the width and height to accommodate the larger circle */}
          <g transform={`translate(${(svgWidth - (maxRadius * 2 + gapSize * 2)) / 2}, ${(svgHeight - (maxRadius * 2 + gapSize * 2)) / 2})`}>
            {locks}
            {lockpickPath}
          </g>
        </svg>
      </div>
    </>
  );
};

export default CircularLock;
