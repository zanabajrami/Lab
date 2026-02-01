import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import './index.css';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import HomePage from './pages/HomePage.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Deals from './pages/Deals.jsx';
import Favorites from './pages/Favorites.jsx';
import Destinations from './pages/Destinations.jsx';
import Hotels from './pages/Hotels.jsx';
import Contact from './components/Contact.jsx';
import CancelBooking from './pages/CancelBooking.jsx';
import AboutUs from './pages/AboutUs.jsx';
import Faq from './pages/Faq.jsx';
import Terms from './pages/Terms.jsx';
import Privacy from './pages/Privacy.jsx';
import Packing from './pages/Packing.jsx';
import PropertyPolicies from './pages/PropertyPolicies.jsx';
import CustomerReviews from './pages/CustomerReviews.jsx';

import Admin from './pages/admin/Admin.jsx';
import LastLogin from './pages/admin/LoginActivity.jsx';
import Settings from './pages/admin/Settings.jsx';
import CancelBookings from './pages/admin/CancelBookings.jsx';

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
          <Route path="/packing" element={<Packing />} />
          <Route path="/property-policies" element={<PropertyPolicies />} />
          <Route path="/customer-reviews" element={<CustomerReviews />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/last-login" element={<LastLogin />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/cancel-bookings" element={<CancelBookings />} />

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
