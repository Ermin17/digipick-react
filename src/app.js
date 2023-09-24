import React from 'react';
import { useState } from 'react';
import CircularLock from './components/Lock.js';
import ListOfLockpicks from './components/ListOfLockpicks.js';
import DifficultySelector from './components/DifficultySelector.js';
import { LockpickProvider } from './components/LockpickContext';
import generateArrayOfLocks from './helpers/generateRandomLock.js';
import generateSolution from './helpers/generateSolution.js';
import generateRemainingLockpicks from './helpers/generateRemainingLockpicks.js';
import './styles.css';

const App = () => {

  const [chosenDifficulty, setChosenDifficulty] = useState('novice');

  const [arrayOfLocks, setArrayOfLocks] = useState(generateArrayOfLocks(chosenDifficulty));

  var numLocks = arrayOfLocks.length;

  const arrayOfSolutions = arrayOfLocks.map((lock) => generateSolution(lock));

  var remainingLockpicks = generateRemainingLockpicks(chosenDifficulty);
  var arrayOfLockpicks = arrayOfSolutions.concat(remainingLockpicks);
  const [allRemainingLockpicks, setAllRemainingLockpicks] = useState(arrayOfLockpicks);

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  shuffleArray(arrayOfLockpicks);
  // Note: Passing in arrayOfLocks also generates solutions since the path data is inverted. Could optimize later

  var handleDifficultyClick = (event) => {
    var newDifficulty = event.target.textContent;
    setChosenDifficulty(newDifficulty);

    const newArrayOfLocks = generateArrayOfLocks(newDifficulty);
    setArrayOfLocks(newArrayOfLocks);

    const newArrayOfSolutions = newArrayOfLocks.map((lock) => generateSolution(lock));

    const newLockpickList = generateRemainingLockpicks(newDifficulty).concat(newArrayOfSolutions);
    setAllRemainingLockpicks(newLockpickList);
  };

  return (
    <LockpickProvider>
      <div className='main-screen'>
        <div className='header'>
          <h1>Starfield Digipick React</h1>
          <span>The readme contains information on how to play. </span>
          <div className='choose-difficulty-below'>Choose a difficulty below:</div>
          <div className='current-difficulty'>Current Difficulty: {chosenDifficulty}</div>
          <div className='column-difficulties'>
            <DifficultySelector handleDifficultyClick={handleDifficultyClick} />
          </div>
        </div>
          <div className='column-lock'>
            <CircularLock
            numLocks={numLocks}
            arrayOfLocks={arrayOfLocks}
            allRemainingLockpicks={allRemainingLockpicks}
            setAllRemainingLockpicks={setAllRemainingLockpicks}
            chosenDifficulty={chosenDifficulty}
            />
          </div>
        <div className='column-lockpicks'>
          <div className='lockpick-list'>
            <ListOfLockpicks arrayOfLockpicks={allRemainingLockpicks} />
          </div>
        </div>
      </div>
    </LockpickProvider>
  );

};

export default App;
