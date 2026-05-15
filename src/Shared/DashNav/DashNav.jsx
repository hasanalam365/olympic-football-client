// DashboardNav.jsx

import React from "react";

import {
  Bell,
  Menu,
  Search,
} from "lucide-react";

const DashboardNav = ({ setMobileOpen }) => {
  return (
    <header className="sticky top-0 z-30 border-b border-cyan-400/10 bg-[#030B18]/90 backdrop-blur-xl">

      <div className="flex items-center justify-between h-20 px-6 lg:px-10">

        {/* LEFT */}
        <div className="flex items-center gap-4">

          {/* MOBILE MENU */}
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden"
          >
            <Menu size={28} />
          </button>

          <div>

            <h2 className="text-3xl font-extrabold tracking-tight text-white">
              Dashboard
            </h2>

            <p className="mt-1 text-sm text-gray-400">
              Tournament overview
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">

          {/* SEARCH */}
          <div className="items-center hidden gap-3 px-4 border rounded-2xl md:flex border-cyan-400/10 bg-[#071120] h-12">

            <Search
              size={18}
              className="text-gray-500"
            />

            <input
              type="text"
              placeholder="Search..."
              className="text-sm text-white bg-transparent outline-none placeholder:text-gray-500"
            />
          </div>

          {/* NOTIFICATION */}
          <button className="relative flex items-center justify-center w-12 h-12 border rounded-2xl border-cyan-400/10 bg-[#071120]">

            <Bell
              size={18}
              className="text-cyan-300"
            />

            <span className="absolute w-2 h-2 bg-red-500 rounded-full top-3 right-3 animate-pulse" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default DashboardNav;