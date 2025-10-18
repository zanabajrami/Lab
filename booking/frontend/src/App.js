import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './index.css';
import Header from './components/Header';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import Login from './pages/Login';
import Register from './pages/Register';
import Deals from "./pages/Deals";
import Favorites from "./pages/Favorites";

function App() {
  const [favorites, setFavorites] = useState([]);
  const toggleFavorite = (deal) => {
    const isFavorited = favorites.some(fav => fav.id === deal.id);
    if (isFavorited) {
      setFavorites(favorites.filter(fav => fav.id !== deal.id));
    } else {
      setFavorites([...favorites, deal]);
    }
  };

  return (
    <Router>
      <div className="bg-gray-100 min-h-screen flex flex-col">
        <Header />

        <main className="flex-grow">
          <Routes>
            <Route
              path="/"
              element={
                <div className="max-w-7xl mx-auto px-4 py-10">
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">
                    Welcome to Booking
                  </h2>
                  <p className="text-gray-700 mb-8">
                    Start your hotel search below...
                  </p>
                  <SearchBar />
                </div>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/deals" element={<Deals />} />
            <Route path="/favorites" element={<Favorites favorites={favorites} />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
