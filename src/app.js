import React from 'react';
import { useState, useEffect } from 'react';
import CircularLock from './components/Lock.js';
import ListOfLockpicks from './components/ListOfLockpicks.js';
import DifficultySelector from './components/DifficultySelector.js';
import { LockpickProvider } from './components/LockpickContext';
import generateArrayOfLocks from './helpers/generateRandomLock.js';
import generateSolution from './helpers/generateSolution.js';
import generateRemainingLockpicks from './helpers/generateRemainingLockpicks.js';
import './styles.css';

const App = () => {

  const [showCongrats, setShowCongrats] = useState(false);
  const [chosenDifficulty, setChosenDifficulty] = useState('novice');
  const [isChanging, setIsChanging] = useState(false);

  const [arrayOfLocks, setArrayOfLocks] = useState(generateArrayOfLocks(chosenDifficulty));

  var numLocks = arrayOfLocks.length;

  const arrayOfSolutions = arrayOfLocks.map((lock) => generateSolution(lock));

  var remainingLockpicks = generateRemainingLockpicks(chosenDifficulty);
  var arrayOfLockpicks = arrayOfSolutions.concat(remainingLockpicks);
  function shuffleArray(array) {
    var lockpicks = array.slice();
    for (let i = lockpicks.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [lockpicks[i], lockpicks[j]] = [lockpicks[j], lockpicks[i]];
    }
    return lockpicks;
  }

  var shuffledLockpicks = shuffleArray(arrayOfLockpicks);
  const [allRemainingLockpicks, setAllRemainingLockpicks] = useState(shuffledLockpicks);

  // Note: Passing in arrayOfLocks also generates solutions since the path data is inverted. Could optimize later

  var handleDifficultyClick = (event) => {
    setIsChanging(!isChanging);
    var newDifficulty = event.target.textContent;
    setChosenDifficulty(newDifficulty);

    const newArrayOfLocks = generateArrayOfLocks(newDifficulty);
    setArrayOfLocks(newArrayOfLocks);

    const newArrayOfSolutions = newArrayOfLocks.map((lock) => generateSolution(lock));

    const newLockpickList = generateRemainingLockpicks(newDifficulty).concat(newArrayOfSolutions);
    setAllRemainingLockpicks(newLockpickList);

    setShowCongrats(false);
  };

  return (
    <LockpickProvider>
      <div className='main-screen'>
        <div className='header'>
          <h1>Digipick in React</h1>
          <span>The readme contains information on how to play. </span>
          <div className='choose-difficulty-below'>Choose a difficulty below:</div>
          {!showCongrats ? <div className='current-difficulty'>Current Difficulty: {chosenDifficulty}</div> : null}
          <div className='column-difficulties'>
            <DifficultySelector handleDifficultyClick={handleDifficultyClick} />
          </div>
        </div>
        {!showCongrats ? (
          <>
            <div className='column-lock'>
              <CircularLock
                numLocks={numLocks}
                arrayOfLocks={arrayOfLocks}
                allRemainingLockpicks={allRemainingLockpicks}
                setAllRemainingLockpicks={setAllRemainingLockpicks}
                chosenDifficulty={chosenDifficulty}
                isChanging={isChanging}
                setShowCongrats={setShowCongrats}
              />
            </div>
            <div className='column-lockpicks'>
              <div className='lockpick-list'>
                <ListOfLockpicks arrayOfLockpicks={allRemainingLockpicks} />
              </div>
            </div>
          </>
        ) : (
          <div className='game-complete'>Select a new difficulty to play again.</div>
        )}
      </div>
    </LockpickProvider>
  );


};

export default App;
