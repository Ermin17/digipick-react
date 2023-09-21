import React from 'react';

const DifficultySelector = ({ handleDifficultyClick }) => {

  return (
    <>
    <div className='difficulties'>
      <div onClick={handleDifficultyClick}>Novice</div>
      <div onClick={handleDifficultyClick}>Advanced</div>
      <div onClick={handleDifficultyClick}>Expert</div>
      <div onClick={handleDifficultyClick}>Master</div>
    </div>
    </>
  );

};

export default DifficultySelector;