// src/components/Navbar.jsx
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar({ showHome = true, showMyBooking = true }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  return (
    <header className="bg-gray-900 text-white shadow-lg border-b border-gray-700 sticky top-0 w-full z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
            <img src="/splash.png" alt="logo" className="w-10 h-10 rounded-full" />
            <div className="hidden sm:block">
              <div className="font-semibold text-lg text-yellow-400">Aurelia Air</div>
              <div className="text-xs text-gray-300">Fly Beyond Luxury</div>
            </div>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-3 font-medium">
            {showHome && (
              <NavLink
                to="/user"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-md text-sm font-medium transition-colors ${isActive ? "bg-yellow-400 text-gray-900" : "text-gray-200 hover:bg-gray-700 hover:text-white"}`
                }
              >
                Home
              </NavLink>
            )}

            {showMyBooking && (
              <NavLink
                to="/mybooking"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-md text-sm font-medium transition-colors ${isActive ? "bg-yellow-400 text-gray-900" : "text-gray-200 hover:bg-gray-700 hover:text-white"}`
                }
              >
                My Bookings
              </NavLink>
            )}

            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-md text-sm font-medium text-gray-200 hover:bg-gray-700 hover:text-white transition"
            >
              Logout
            </button>
          </nav>

          {/* Mobile toggle */}
          <button
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-200 hover:bg-gray-800"
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <svg className="h-6 w-6" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-gray-800 border-t border-gray-700">
          <div className="px-3 py-2 space-y-1">
            {showHome && (
              <NavLink
                to="/user"
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `block w-full py-2 rounded-md px-3 transition ${isActive ? "bg-yellow-400 text-gray-900" : "text-gray-200 hover:bg-gray-700 hover:text-white"}`
                }
              >
                Home
              </NavLink>
            )}

            {showMyBooking && (
              <NavLink
                to="/mybooking"
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `block w-full py-2 rounded-md px-3 transition ${isActive ? "bg-yellow-400 text-gray-900" : "text-gray-200 hover:bg-gray-700 hover:text-white"}`
                }
              >
                My Bookings
              </NavLink>
            )}

            <button
              onClick={() => { handleLogout(); setOpen(false); }}
              className="w-full text-left py-2 px-3 rounded-md text-gray-200 hover:bg-gray-700 hover:text-white transition"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
