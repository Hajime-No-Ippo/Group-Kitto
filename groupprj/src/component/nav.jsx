// src/component/nav.jsx
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Nav = () => {
  const handleOnclick = (e) => {
    e.preventDefault();
    window.location.href = "/userProfile";
  };
  return (
    <nav className="navbar navbar-dark bg-dark px-4">
      {/* Logo - click this logo always go to home */}
      <a className="navbar-brand fw-bold" href="/">
        Kitto Market
      </a>

      {/* Right side button */}
      <a className="btn btn-outline-light" href="/profile" onClick={handleOnclick}>
        My Profile
      </a>
    </nav>
  );
};

export default Nav;
