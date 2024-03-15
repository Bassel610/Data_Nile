import { useState } from 'react';
import './App.css';
import "./Resbonsic.css"
import EditText from './Componant/EditText/EditText';
import HomePage from './Pages/HomePage/HomePage';
import Invits from "./Componant/Invits/Invits"
import {BrowserRouter as Router,Route,Routes, Link } from 'react-router-dom';
import ResetPassword from './ResetPassowrd/ResetPassowrd';
function App() {
  const [text, setText] = useState('Initial text');

  return (
    <div className="App">
      <Routes>
      <Route path='/' element={<HomePage/>} />
      <Route path='/Dachboeard' element={<EditText setText={setText} />} />
      <Route path='/ResetPassword' element={<ResetPassword setText={setText} />} />
      <Route path='/Invits' element={<Invits  />} />
      </Routes>
    </div>
  );
}

export default App;
