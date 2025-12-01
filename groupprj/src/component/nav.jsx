import React from "react";
import { logout } from "../service/authService";
import "bootstrap/dist/css/bootstrap.min.css";

const Nav = () => {
  const handleLogOut = async (e) => {
    e.preventDefault();
    await logout();
    window.location.href = "/";
  };

  return (
    <>
      {/* Top Banner */}
      <div className="w-full bg-brand text-white font-brand py-[4px] text-[12px] tracking-wide uppercase">
        <div className="max-w-[1200px] mx-auto pl-8">
          Embrace Sustainability with GreenCycle Market
        </div>
      </div>

      {/* Main Navigation */}
      <div className="w-full bg-[var(--nav-bg)] shadow-brand border-b border-[var(--border)]">
        <nav className="max-w-[1200px] mx-auto px-8 py-3 flex justify-between items-center font-brand text-brand">


          {/* Logo */}
          <a
            href="/home"
            className="text-[26px] font-medium hover:opacity-80 transition no-underline text-brand"
          >
            GreenCycle <span className="font-normal">Market</span>
          </a>

          {/* Menu */}
          <div className="flex gap-6 text-[15px] font-normal">
            <a
              href="/userProfile"
              className="hover:opacity-70 transition no-underline text-brand"
            >
              My Profile
            </a>

            <a
              href="/likeit"
              className="hover:opacity-70 transition no-underline text-brand"
            >
              My Favorites
            </a>

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
