// src/component/nav.jsx
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Nav = () => {
  return (
    <nav className="navbar navbar-dark bg-dark px-4">
      {/* Logo - click this logo always go to home */}
      <a className="navbar-brand fw-bold" href="/home">
        Kitto Market
      </a>

      {/* Right side button */}
      <a className="btn btn-outline-light" href="/profile">
        My Profile
      </a>
    </nav>
  );
};

export default Nav;
