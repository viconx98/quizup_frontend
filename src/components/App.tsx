import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../types/hooks';
import Signup from './Signup/Signup';

function App() {
  const { isDarkTheme } = useAppSelector(state => state.ui)

  const classString = isDarkTheme
    ? "dark " + "w-full h-screen font-poppins text-d_text"
    : "w-full h-screen text-l_text  font-poppins"

  return (
    <div className={classString}>
      <Routes>
        <Route path='/signup' element={<Signup />} />

      </Routes>
    </div>
  );
}

export default App;
