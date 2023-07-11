// App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Menu from './Menu';
import SignIn from './SignIn';
import './App.css';
import MyChessboard from './MyChessboard.tsx';
import StrategyCanvas from './StrategyCanvas';


function App() {
  return (
    <div className="App">
      <Router>
        <Menu />

        <header className="App-header">
          <Routes>
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/create-bot" element={<StrategyCanvas />} />
            <Route path="/play-against-others" element={<MyChessboard />} />
            <Route path="/" element={<MyChessboard />} />
          </Routes>
        </header>
      </Router>
    </div>
  );
}

export default App;
