import React from 'react';

const SelectedLockpick = ({ selectedLockpick }) => {

  const gapSize = 8; // Adjust the size of the gap
  const maxRadius = Math.min(500, 1000) / 2; // Increase the radius value to make the circle appear larger
  const centerX = maxRadius; // X-coordinate of the circle's center
  const centerY = maxRadius; // Y-coordinate of the circle's center

  const stepAngle = (2 * Math.PI) / 20; // Angle between each step

  const lockpickPath = selectedLockpick.map((value, index) => {
    const strokeWidth = value === 1 ? '15' : '1';

    const radius = maxRadius * 1.1; // Use the same radius for each circle
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
          stroke='red'
          strokeWidth={strokeWidth}
        />
      );
    } else {
      return (
        <path
            key={index}
            d={`M ${x1},${y1} A ${radius},${radius} 0 0,1 ${x2},${y2}`}
            fill='none'
            stroke='aliceblue'
            strokeWidth={strokeWidth}
          />
      );
    }
  });

  const svgWidth = maxRadius * 2 + gapSize * 30; // Calculate the SVG width
  const svgHeight = maxRadius * 2 + gapSize * 30; // Calculate the SVG height

  return (
    <>
      {lockpickPath}
    </>
  );
};

export default SelectedLockpick;