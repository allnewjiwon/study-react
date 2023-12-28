import logo from './logo.svg';
import React from 'react';
import Home from './Home';
// import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <Router>
      {/* <Routes>
      <Route path="/movie" element={<Detail />}></Route>
    </Routes> */}
      <Routes>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
