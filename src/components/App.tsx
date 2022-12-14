import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../types/hooks';
import EditQuiz from './EditQuiz/EditQuiz';
import Home from './Home/Home';
import MyQuizzes from './MyQuizzes/MyQuizzes';
import PlayQuiz from './PlayQuiz/PlayQuiz';
import RunQuiz from './RunQuiz/RunQuiz';
import Signin from './Signin/Signin';
import Signup from './Signup/Signup';

function App() {
  const { isDarkTheme } = useAppSelector(state => state.ui)

  const classString = isDarkTheme
    ? "dark " + "w-full h-screen font-poppins text-d_text"
    : "w-full h-screen text-l_text font-poppins"

  return (
    <div className={classString}>
      <Routes>
        <Route path='/play' element={<PlayQuiz   />} />
        <Route path='/run/:quizId' element={<RunQuiz />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Signin />} />

        <Route path='/' element={<Home/>}>
          <Route index element={<MyQuizzes/>} />
          <Route path='/edit' element={<EditQuiz/>} />
          <Route path='/reports' element={<h1>Reports</h1>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
