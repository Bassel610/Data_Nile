import HomePage from './Pages/HomePage/HomePage';
import {Route, Routes } from 'react-router-dom';
import Dashboard from './Pages/Dashboard/Dashboard';

import './App.css';
import "./Responsive.css"
function App() {
  return (
    <div className="App">
      <Routes>
      <Route path='/' element={<HomePage/>} />
      <Route path='/Dashboard' element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
