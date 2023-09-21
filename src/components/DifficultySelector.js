import React from 'react';

const DifficultySelector = ({ handleDifficultyClick }) => {

  return (
    <>
    <div className='difficulties'>
      <div onClick={handleDifficultyClick}>novice</div>
      <div onClick={handleDifficultyClick}>advanced</div>
      <div onClick={handleDifficultyClick}>expert</div>
      <div onClick={handleDifficultyClick}>master</div>
    </div>
    </>
  );

};

export default DifficultySelector;