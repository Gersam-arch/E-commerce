import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<h1>Welcome to E-Shop</h1>} />
            <Route path="/signin" element={<h1>Sign In Page</h1>} />
            <Route path="/cart" element={<h1>Shopping Cart</h1>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App