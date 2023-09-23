import React from 'react';
import "./App.scss";
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Home from './Components/Home/Home';

const App = () => {
  return (
    <Router>
      <h1>Welcome</h1>
      <Routes>
        <Route path='/' element={<Home />} />
        
      </Routes>

    </Router>
  )
}

export default App;