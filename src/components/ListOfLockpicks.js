import React from 'react';
import Lockpick from './Lockpick.js';
import '../styles.css'

const ListOfLockpicks = ({ arrayOfLockpicks }) => {

  return (
    <>
    <div className='list-of-lockpicks'>
      <div className='lockpick-header'>
        Digipicks
      </div>
      <div>
        {arrayOfLockpicks.map((lockpick, index) => {
          return (
            <Lockpick key={index} lockpick={lockpick} />
          );
        })}
      </div>

    </div>
    </>
  );
};

export default ListOfLockpicks;