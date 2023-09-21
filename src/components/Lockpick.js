import React from 'react';

const Lockpick = ({ lockpick }) => {
  const gapSize = 8; // Adjust the size of the gap
  const maxRadius = Math.min(100, 200) / 2; // Increase the radius value to make the circle appear larger
  const centerX = maxRadius; // X-coordinate of the circle's center
  const centerY = maxRadius; // Y-coordinate of the circle's center

  const stepAngle = (2 * Math.PI) / lockpick.length; // Angle between each step

  const pathData = lockpick.map((value, index) => {
    if (value === 1) {
      const radius = maxRadius; // Use the same radius for each circle
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

  const svgWidth = maxRadius * 2 + gapSize * 30; // Calculate the SVG width
  const svgHeight = maxRadius * 2 + gapSize * 30; // Calculate the SVG height

  return (
    <svg width={svgWidth} height={svgHeight}>
      {/* Increase the width and height to accommodate the larger circle */}
      <g
        transform={`translate(${
          (svgWidth - (maxRadius * 2 + gapSize * 2)) / 2
        }, ${(svgHeight - (maxRadius * 2 + gapSize * 2)) / 2})`}
      >
        <path
          d={pathData}
          fill='none'
          stroke='aliceblue'
          strokeWidth='8'
        />
      </g>
    </svg>
  );
};

export default Lockpick;
