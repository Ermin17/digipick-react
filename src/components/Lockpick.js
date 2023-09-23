import React from 'react';
import { useLockpickContext } from './LockpickContext';

const Lockpick = ({ lockpick }) => {

  const { selectedLockpick, setSelectedLockpick } = useLockpickContext();

  var handleLockpickSelection = (lockpick) => {
    setSelectedLockpick(lockpick);
  };

  const gapSize = 4; // Adjust the size of the gap
  const maxRadius = Math.min(100, 200) / 2; // Increase the radius value to make the circle appear larger
  const centerX = maxRadius; // X-coordinate of the circle's center
  const centerY = maxRadius; // Y-coordinate of the circle's center

  const stepAngle = (2 * Math.PI) / lockpick.length; // Angle between each step

  const paths = lockpick.map((value, index) => {

    const strokeWidth = value === 1 ? '8' : '1'; // Set the stroke width based on value

    const radius = maxRadius; // Use the same radius for each circle
    const startAngle = stepAngle * index;
    const endAngle = stepAngle * (index + 1);

    const x1 = centerX + radius * Math.cos(startAngle);
    const y1 = centerY + radius * Math.sin(startAngle);
    const x2 = centerX + radius * Math.cos(endAngle);
    const y2 = centerY + radius * Math.sin(endAngle);

    if (value === 1) {
      return (
        <path
          key={index}
          d={`M ${x1},${y1} A ${radius},${radius} 0 0,1 ${x2},${y2}`}
          fill='none'
          stroke='aliceblue'
          strokeWidth={strokeWidth} // Use the calculated stroke width
        />
      );
    } else {
      return (
        <path
          key={index}
          d={`M ${x1},${y1} A ${radius},${radius} 0 0,1 ${x2},${y2}`}
          fill='none'
          stroke='aliceblue'
          strokeWidth={strokeWidth} // Use the calculated stroke width
        />
      );
    }

  });

  const svgWidth = maxRadius * 2 + gapSize * 30; // Calculate the SVG width
  const svgHeight = maxRadius * 2 + gapSize * 30; // Calculate the SVG height

  return (
    <svg className='lockpick' width={svgWidth} height={svgHeight} onClick={() => handleLockpickSelection(lockpick)}>
      {/* Increase the width and height to accommodate the larger circle */}
      <g
        transform={`translate(${
          (svgWidth - (maxRadius * 2 + gapSize * 2)) / 2
        }, ${(svgHeight - (maxRadius * 2 + gapSize * 2)) / 2})`}
      >
        {paths}
        {lockpick === selectedLockpick && (
          <circle cx={centerX} cy={centerY} r={maxRadius / 2} fill='aliceblue' />
        )}
      </g>
    </svg>
  );
};

export default Lockpick;
