import React, { useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import logoutButton from "../LogOutButton/LogOutButton";
import { StoreContext } from "../../Context/StoreContext";
import LogoutButton from "../LogOutButton/LogOutButton";
import axios from "axios";
const Navbar = ({ setShowLogin, isLoggedIn, handleLogout,setIsLoggedIn }) => {
  const { getTotalCartAmount } = useContext(StoreContext);
  const [menu, setMenu] = useState("menu");

  return (
    <div className="navbar">
      <Link to="/">
        <img src={assets.logo} alt="" className="logo" />
      </Link>

      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          home
        </Link>
        <a
          href="#explore-menu"
          onClick={() => setMenu("menu")}
          className={menu === "menu" ? "active" : ""}
        >
          menu
        </a>
        <a
          href="#app-download"
          onClick={() => setMenu("mobile-app")}
          className={menu === "mobile-app" ? "active" : ""}
        >
          mobile-app
        </a>
        <Link
          to="/contact"
          onClick={() => setMenu("contact-us")}
          className={menu === "contact-us" ? "active" : ""}
        >
          contact us
        </Link>
      </ul>

      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="" />
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>

    {isLoggedIn ? (
  <LogoutButton setIsLoggedIn={setIsLoggedIn} />
) : (
  <button onClick={() => setShowLogin(true)}>Sign In</button>
)}

      </div>
    </div>
  );
};

export default Navbar;
