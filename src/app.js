import React from 'react';
import { useState, useEffect } from 'react';
import CircularLock from './components/Lock.js';
import ListOfLockpicks from './components/ListOfLockpicks.js';
import DifficultySelector from './components/DifficultySelector.js';
import SelectedLockpick from './components/SelectedLockpick.js';
import generateArrayOfLocks from './helpers/generateRandomLock.js';
import generateSolution from './helpers/generateSolution.js';
import generateRemainingLockpicks from './helpers/generateRemainingLockpicks.js';
import './styles.css';

const App = () => {

  var chosenDifficulty = 'master';

  var handleDifficultyClick = (event) => {
    setChosenDifficulty(event.target.textContent);
    console.log(event.target.textContent);
  };


  var arrayOfLocks = generateArrayOfLocks(chosenDifficulty);
  var numLocks = arrayOfLocks.length;

  var arrayOfSolutions = [];
  for (let i = 0; i < arrayOfLocks.length; i++) {
    var newLockpick = generateSolution(arrayOfLocks[i]);
    arrayOfSolutions.push(newLockpick);
  }

  var remainingLockpicks = generateRemainingLockpicks(chosenDifficulty);
  var arrayOfLockpicks = arrayOfSolutions.concat(remainingLockpicks);

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  shuffleArray(arrayOfLockpicks);

  const [selectedLockpick, setSelectedLockpick] = useState([]);
  var handleLockpickSelection = (event) => {
    console.log(event);
    setSelectedLockpick(event.target);
  };

  return (
    <>
      <div className='main-screen'>
        <DifficultySelector handleDifficultyClick={handleDifficultyClick} />
        <CircularLock numLocks={numLocks} arrayOfLocks={arrayOfLocks} />
        <ListOfLockpicks arrayOfLockpicks={arrayOfLockpicks} handleLockpickSelection={handleDifficultyClick} />
        <SelectedLockpick />
      </div>
    </>
  )
};

export default App;
