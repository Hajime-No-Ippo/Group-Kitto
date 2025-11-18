// src/component/nav.jsx
import React from "react";
import {logout} from "../service/authService";
import "bootstrap/dist/css/bootstrap.min.css";

const Nav = () => {
  const handleOnclick = (e) => {
    e.preventDefault();
    window.location.href = "/userProfile";
  };

  const handleLogOut = async (e) => {
    e.preventDefault();
    try {
      await logout();
      window.location.href = "/";
    } catch (error) {
      console.error("Error during logout:", error);
    }
  }

  return (
    <nav className="navbar navbar-dark bg-dark px-4">
      {/* Logo - click this logo always go to home */}
      <a className="navbar-brand font-semibold" href="/">
        Kitto
        <span className="font-extralight ml-1">Market</span>
      </a>

      {/* Right side button */}
      <a className="btn btn-outline-light" href="/profile" onClick={handleOnclick}>
        My Profile
      </a>

      {/* Sign out button */}
      <a className="btn btn-outline-light"  href="/" onClick={handleLogOut}>
        Sign Out
      </a>
    </nav>
  );
};

export default Nav;
