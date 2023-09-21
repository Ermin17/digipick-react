import React, { createContext, useContext, useState } from 'react';

const LockpickContext = createContext();

export function LockpickProvider({ children }) {

  const [selectedLockpick, setSelectedLockpick] = useState([]);

  return (
    <LockpickContext.Provider value={{ selectedLockpick, setSelectedLockpick }}>
      {children}
    </LockpickContext.Provider>
  );
};

export function useLockpickContext() {
  return useContext(LockpickContext);
};