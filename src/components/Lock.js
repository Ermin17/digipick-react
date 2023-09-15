import React from 'react';

const CircularLock = () => {
  const lockArray = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 1, 0, 1, 1, 0, 0, 0,
    0, 0, 1, 1, 1, 1, 1, 1, 0, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 0,
    0, 0, 1, 1, 1, 1, 1, 1, 0, 0,
    0, 0, 0, 1, 1, 1, 1, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ];

  const gapSize = 2; // Adjust the size of the gap
  const radius = Math.min(150, 300) / 2; // Increase the radius value to make the circle appear larger
  const centerX = radius; // X-coordinate of the circle's center
  const centerY = radius; // Y-coordinate of the circle's center

  const stepAngle = (2 * Math.PI) / lockArray.length; // Angle between each step

  const pathData = lockArray.map((value, index) => {
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
    <>
      <svg width="300" height="300"> {/* Increase the width and height to accommodate the larger circle */}
        <path
          d={pathData}
          fill="none"
          stroke="blue" // Color of the circular path
          strokeWidth="12" // Adjust the strokeWidth to control the width of the gaps
        />
      </svg>
    </>
  );
};

export default CircularLock;
