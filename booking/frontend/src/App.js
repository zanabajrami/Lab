import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './index.css';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import Deals from "./pages/Deals";
import Favorites from "./pages/Favorites";

function App() {
  const [favorites, setFavorites] = useState([]);

  return (
    <Router>
      <div className="bg-gray-100 min-h-screen flex flex-col">
        <Header />

        <main className="flex-grow">
          <Routes>
            {/* Faqja kryesore */}
            <Route path="/" element={<HomePage />} />

            {/* Faqe të tjera */}
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
    </Router>
  );
}

export default App;
