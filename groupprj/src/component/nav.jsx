import React from "react";
import { logout } from "../service/authService";
import "bootstrap/dist/css/bootstrap.min.css";

const Nav = () => {
  // This runs when user clicks "Sign Out"
  const handleLogOut = async (e) => {
    e.preventDefault(); // stop page from refreshing
    await logout(); // call logout function
    window.location.href = "/"; // go back to homepage
  };

  return (
    <>
      {/* This is the small banner on top of the page */}
      <div className="w-full bg-brand text-white font-brand py-[4px] text-[12px] tracking-wide uppercase">
        <div className="max-w-[1200px] mx-auto pl-8">
          Embrace Sustainability with GreenCycle Market
        </div>
      </div>

      {/* This is the main navigation bar */}
      <div className="w-full bg-[var(--nav-bg)] shadow-brand border-b border-[var(--border)]">
        <nav className="max-w-[1200px] mx-auto px-8 py-3 flex justify-between items-center font-brand text-brand">
          {/* Website logo. Clicking it goes to home page */}
          <a
            href="/home"
            className="text-[26px] font-medium hover:opacity-80 transition no-underline text-brand"
          >
            GreenCycle <span className="font-normal">Market</span>
          </a>

          {/* Menu links on the right side */}
          <div className="flex gap-6 text-[15px] font-normal">
            {/* Link to user profile page */}
            <a
              href="/userProfile"
              className="hover:opacity-70 transition no-underline text-brand"
            >
              My Profile
            </a>

            {/* Link to user's favorite list */}
            <a
              href="/likeit"
              className="hover:opacity-70 transition no-underline text-brand"
            >
              My Favorites
            </a>

            {/* User clicks this to sign out */}
            <a
              href="/"
              onClick={handleLogOut}
              className="hover:opacity-70 transition no-underline text-brand"
            >
              Sign Out
            </a>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Nav;
