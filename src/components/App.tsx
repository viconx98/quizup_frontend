import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Signup from './Signup/Signup';

function App() {
  return (
    <div className="w-full h-screen bg-gray-800 text-gray-50 font-poppins">
        <Routes>
          <Route path='/signup' element={<Signup/>}/>

        </Routes>
    </div>
  );
}

export default App;
