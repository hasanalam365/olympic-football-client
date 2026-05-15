// Navbar.jsx
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Trophy,
  Menu,
  X,
  LayoutDashboard,
} from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Matches", path: "/matches" },
    { name: "Point Table", path: "/pointTable" },
    { name: "Teams", path: "/teams" },
    { name: "Players", path: "/players" },
    { name: "News", path: "/news" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-cyan-500/20 bg-[#071120]/95 backdrop-blur-xl">
      <div className="max-w-[1400px] mx-auto px-5 lg:px-8">
        <div className="flex items-center justify-between h-[68px]">

          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3">

            {/* ICON */}
            <div className="flex items-center justify-center w-11 h-11 rounded-2xl bg-cyan-400/10 border border-cyan-400/20 shadow-[0_0_20px_rgba(34,211,238,0.15)]">
              <Trophy
                size={20}
                className="text-cyan-300"
                strokeWidth={2.2}
              />
            </div>

            {/* TEXT */}
            <div className="flex items-center text-xl font-extrabold tracking-wide uppercase">
              <span className="text-white">Arena</span>
              <span className="text-cyan-400">Cup</span>
            </div>
          </Link>

          {/* DESKTOP MENU */}
          <div className="items-center hidden gap-10 lg:flex">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `relative text-[15px] font-semibold transition-all duration-300 ${
                    isActive
                      ? "text-cyan-400"
                      : "text-gray-400 hover:text-white"
                  }`
                }
              >
                {({ isActive }) => (
                  <div className="relative flex flex-col items-center">
                    {link.name}

                    {/* ACTIVE LINE */}
                    {isActive && (
                      <span className="absolute -bottom-[18px] h-[2px] w-full bg-cyan-400 rounded-full shadow-[0_0_12px_#22d3ee]" />
                    )}
                  </div>
                )}
              </NavLink>
            ))}
          </div>

          {/* RIGHT SIDE */}
          <div className="items-center hidden gap-4 lg:flex">

            {/* ADMIN BUTTON */}
            <Link
              to="/dashboard"
              className="flex items-center gap-2 px-5 py-2 text-sm font-semibold text-cyan-300 transition-all duration-300 border rounded-xl border-cyan-400/30 bg-cyan-400/10 hover:bg-cyan-400/20 hover:shadow-[0_0_25px_rgba(34,211,238,0.25)]"
            >
              <LayoutDashboard size={16} />
              Admin
            </Link>
          </div>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white lg:hidden"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="border-t lg:hidden border-cyan-500/20 bg-[#071120]">
          <div className="flex flex-col px-6 py-6 space-y-6">

            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `text-[15px] font-medium transition ${
                    isActive
                      ? "text-cyan-400"
                      : "text-gray-300 hover:text-white"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            {/* MOBILE ADMIN BUTTON */}
            <Link
              to="/dashboard"
              className="flex items-center justify-center gap-2 py-3 mt-4 font-semibold border text-cyan-300 rounded-xl border-cyan-400/30 bg-cyan-400/10"
            >
              <LayoutDashboard size={18} />
              Admin Panel
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}