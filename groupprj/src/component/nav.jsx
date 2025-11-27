import React from "react";
import { logout } from "../service/authService";
import { useNavigate } from "react-router-dom";
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
  };

  return (
    <nav className="w-full bg-black text-white px-8 py-3 flex justify-between shadow">
      <a
        href="/home"
        className="text-2xl font-bold tracking-wide no-underline text-white hover:opacity-80 transition"
      >
        Kitto<span className="font-light ml-1">Market</span>
      </a>

      <div className="flex space-x-7">
        {/* My Profile */}
        <a
          className="font-extralight text-white no-underline hover:underline mt-1"
          href="/userProfile"
          onClick={handleOnclick}
        >
          My Profile
        </a>

        {/* My Favorites */}
        <a
          className="font-extralight text-white no-underline hover:underline mt-1"
          href="/likeit"
        >
          My Favorites
        </a>

        {/* Sign Out */}
        <a
          className="font-extralight text-white no-underline hover:underline mt-1"
          href="/"
          onClick={handleLogOut}
        >
          Sign Out
        </a>
      </div>
    </nav>
  );
};

export default Nav;
