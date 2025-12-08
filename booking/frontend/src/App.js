import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import './index.css';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import Deals from "./pages/Deals";
import Favorites from "./pages/Favorites";
import Destinations from "./pages/Destinations";
import Hotels from "./pages/Hotels";
import Contact from './components/Contact';
import CancelBooking from './pages/CancelBooking';
import AboutUs from './pages/AboutUs';
import Faq from './pages/Faq';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import OurTeam from './pages/OurTeam';
import Packing from './pages/Packing';
import PropertyPolicies from './pages/PropertyPolicies';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, [pathname]);

  return null;
}

function MainWrapper() {
  const [showContact, setShowContact] = useState(false);
  const location = useLocation();
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("favorites")) || [];
  });

  // Ruaj favorites automatikisht në localStorage
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header />
      <main className={`flex-grow ${location.pathname !== '/' ? 'pt-16' : ''}`}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/deals" element={<Deals favorites={favorites} setFavorites={setFavorites} />} />
          <Route path="/favorites" element={<Favorites favorites={favorites} setFavorites={setFavorites} />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/hotels" element={<Hotels favorites={favorites} setFavorites={setFavorites} />} />
          <Route path="/cancel-booking" element={<CancelBooking />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/our-team" element={<OurTeam />} />
          <Route path="/packing" element={<Packing />} />
          <Route path="/property-policies" element={<PropertyPolicies />} />

        </Routes>
      </main>
      <Footer onShowContact={() => setShowContact(true)} />
      {showContact && <Contact onClose={() => setShowContact(false)} />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <MainWrapper />
    </Router>
  );
}

export default App;
