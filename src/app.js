import React from 'react';
import CircularLockLock from './components/Lock.js';
import './styles.css';

const App = () => {
  return (
    <>
    {/* <div className='circle'>Hello world!</div> */}
    <div>
      <CircularLockLock numLocks={5} />
    </div>
    </>
  )
};

export default App;
