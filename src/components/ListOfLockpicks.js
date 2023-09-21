import React from 'react';
import { useState } from 'react';
import Lockpick from './Lockpick.js';
import '../styles.css'

const ListOfLockpicks = ({ arrayOfLockpicks, handleLockpickSelection }) => {

  return (
    <>
    <div className='list-of-lockpicks'>
      <div className='lockpick-header'>
        Lockpicks
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