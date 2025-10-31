import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import './index.css';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import Deals from "./pages/Deals";
import Favorites from "./pages/Favorites";

function MainWrapper() {
  const location = useLocation();
  const [favorites, setFavorites] = useState([]);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header />

      {/* Vetëm faqet që nuk janë HomePage marrin padding-top */}
      <main className={`flex-grow ${location.pathname !== '/' ? 'pt-16' : ''}`}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/deals"
            element={<Deals favorites={favorites} setFavorites={setFavorites} />}
          />
          <Route
            path="/favorites"
            element={<Favorites favorites={favorites} setFavorites={setFavorites} />}
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <MainWrapper />
    </Router>
  );
}

export default App;
