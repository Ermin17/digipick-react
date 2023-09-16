import React from 'react';
import CircularLock from './components/Lock.js';
import generateArrayOfLocks from './helpers/generateRandomLock.js';
import './styles.css';

const App = () => {

  var arrayOfLocks = generateArrayOfLocks('expert');
  var numLocks = arrayOfLocks.length;

  return (
    <>
      <div>
        <CircularLock numLocks={numLocks} arrayOfLocks={arrayOfLocks} />
      </div>
    </>
  )
};

export default App;
