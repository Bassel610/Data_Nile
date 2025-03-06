import HomePage from './Pages/HomePage/HomePage';
import {Route, Routes } from 'react-router-dom';
import Dashboard from './Pages/Dashboard/Dashboard';

import './App.css';
import "./Responsive.css"
import { useEffect, useState } from 'react';
function App() {
  const COLOR_PALETTE = {
    "--main-bg": ["#1b1b1b", "#121212", "#333", "#555", "#000"],
    "--primary-bg": ["#333", "#444", "#555", "#666", "#777"],
    "--light-bg": ["gray", "#bbb", "#ddd", "#f5f5f5", "#fff"],
    "--main-text": ["#666", "#888", "#aaa", "#ccc", "#fff"],
    "--primary-text": ["black", "#222", "#444", "#666", "#888"],
    "--gold-hover": ["#ab844e", "#c79a5d", "#d4a15e", "#e5b873", "#f8cc8a"],
    "--border-color": ["#ccc", "#bbb", "#aaa", "#999", "#888"],
    "--shadow-color": [
      "rgba(0,0,0,0.1)",
      "rgba(0,0,0,0.2)",
      "rgba(0,0,0,0.3)",
      "rgba(0,0,0,0.4)",
      "rgba(0,0,0,0.5)"
    ],
  };
      const [selectedColors, setSelectedColors] = useState(() => {
          // Load colors individually from localStorage
          return Object.keys(COLOR_PALETTE).reduce((acc, key) => {
              acc[key] = localStorage.getItem(key) || COLOR_PALETTE[key][0]; // Use saved color or default
              return acc;
          }, {});
      });
      useEffect
      (() => {
          // Apply saved colors on page load
          Object.entries(selectedColors).forEach(([key, color]) => {
              document.documentElement.style.setProperty(key, color);
          });
      }, [selectedColors]);
  
      const handleColorChange = (variable, color) => {
          setSelectedColors((prevColors) => {
              const updatedColors = { ...prevColors, [variable]: color };
              
              // Save each color separately
              localStorage.setItem(variable, color);
              document.documentElement.style.setProperty(variable, color);
              
              return updatedColors;
          });
      };
  return (
    <div className="App">
      <Routes>
      <Route path='/' element={<HomePage/>} />
      <Route path='/Dashboard' element={<Dashboard
                              colorPalette={COLOR_PALETTE} 
                              selectedColors={selectedColors} 
                              onColorChange={handleColorChange} 
       />} />
      </Routes>
    </div>
  );
}

export default App;
