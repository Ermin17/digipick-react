import React from 'react';
import '../styles.css';

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
  const radius = Math.min(500, 1000) / 2; // Increase the radius value to make the circle appear larger
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

  const svgWidth = radius * 2 + gapSize * 30; // Calculate the SVG width
  const svgHeight = radius * 2 + gapSize * 30; // Calculate the SVG height

  return (
    <>
    <div className='centered-lock-container'>
        <svg width={svgWidth} height={svgHeight}> {/* Increase the width and height to accommodate the larger circle */}
          <g transform={`translate(${(svgWidth - (radius * 2 + gapSize * 2)) / 2}, ${(svgHeight - (radius * 2 + gapSize * 2)) / 2})`}>
            <path
              d={pathData}
              fill="none"
              stroke="blue" // Color of the circular path
              strokeWidth="8" // Adjust the strokeWidth to control the width of the gaps
            />
          </g>
        </svg>
      </div>
    </>
  );
};

export default CircularLock;
