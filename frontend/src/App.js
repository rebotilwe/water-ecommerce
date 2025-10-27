import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Cart from './pages/Cart/Cart';
import Home from './pages/Home/Home';
import Footer from './components/Footer/Footer';
import LoginPopUp from './components/LoginPopUp/LoginPopUp';
import Success from './components/Success';
// import Cancel from './components/Cancel';
// import Contact from './components/Contact/Contact';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // Check if a session already exists on first load
  useEffect(() => {
    fetch('http://localhost:8085/user', { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        if (data.valid) {
          setIsLoggedIn(true);
          setUser(data.user);
        }
      })
      .catch(() => {}); // ignore if not logged in
  }, []);

  const handleLogout = async () => {
    await fetch('http://localhost:8085/logout', {
      method: 'POST',
      credentials: 'include'
    });
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <>
      {showLogin && (
        <LoginPopUp
          setShowLogin={setShowLogin}
          setIsLoggedIn={setIsLoggedIn}
          setUser={setUser}
        />
      )}

      <div className="app">
        <Navbar
          setShowLogin={setShowLogin}
          isLoggedIn={isLoggedIn}
          handleLogout={handleLogout}
          user={user}
        />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/success" element={<Success />} />
       
        </Routes>
      </div>

      <Footer />
    </>
  );
};

export default App;
// *** FIXED: full API URL to match your Express server on port 8085 ***