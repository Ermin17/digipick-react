import React from 'react';

const DifficultySelector = ({ handleDifficultyClick }) => {

  return (
    <>
    <div className='difficulty'>
      <div id="difficulty-novice" onClick={handleDifficultyClick}>novice</div>
      <div id="difficulty-advanced" onClick={handleDifficultyClick}>advanced</div>
      <div id="difficulty-expert" onClick={handleDifficultyClick}>expert</div>
      <div id="difficulty-master" onClick={handleDifficultyClick}>master</div>
    </div>
    </>
  );

};

export default DifficultySelector;