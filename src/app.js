import React from 'react';
import CircularLock from './components/Lock.js';
import './styles.css';

const App = () => {
  return (
    <>
    {/* <div className='circle'>Hello world!</div> */}
    <div>
      <CircularLock numLocks={5} />
    </div>
    </>
  )
};

export default App;
