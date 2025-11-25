// src/component/nav.jsx
import React from "react";
import {logout} from "../service/authService";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Nav = () => {
  const handleOnclick = (e) => {
    e.preventDefault();
    window.location.href = "/userProfile";
  };

  const navigate = useNavigate();

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
    <nav className="w-full bg-black text-white px-8 py-3 flex justify-between shadow">

      {/* Logo - click this logo always go to home */}
      <a className="text-2xl navbar-brand font-semibold justify-start no-underline item-center
" href="/">
        Kitto
        <span className="font-extralight ml-1">Market</span>
      </a>
<div className="justify-between flex space-x-7">
      {/* Right side button */}
      <a className=" font-extralight flex gap-1 text-white no-underline hover:underline item-center mt-1
" href="/profile" onClick={handleOnclick}>
        My Profile
      </a>

      {/* Right side button */}
      <a className=" font-extralight flex  gap-1 no-underline hover:underline text-white item-center mt-1
" href="/likeit" onClick={handleOnclick}>
        My Likes
      </a>


      {/* Sign out button */}
      <a className="font-extralight flex gap-1 no-underline hover:underline text-white item-center mt-1
"  href="/" onClick={handleLogOut}>
        Sign Out
      </a>
      </div>
    </nav>
  );
};

export default Nav;
