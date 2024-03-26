import React from 'react';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './pages/About';
import { LayoutNav } from './pages/LayoutNav';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Phenotype from './pages/Phenotype';
import Quiz from './pages/Quiz';
import SavingsCalculatorPage from './pages/SavingsCalculatorPage'; // Import the SavingsCalculatorPage

import { supabase } from './supabase';
import { createClient } from '@supabase/supabase-js';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<LayoutNav />}>
          <Route path="about" element={<About />} />
          <Route path="phenotype" element={<Phenotype />} />
          <Route path="quiz" element={<Quiz />} />
          {/* Update the route for /home/nowvslater to use SavingsCalculatorPage */}
          <Route path="nowvslater" element={<SavingsCalculatorPage />} />
        </Route>
        {/* You can add more routes as needed */}
      </Routes>
    </Router>
  );
}
