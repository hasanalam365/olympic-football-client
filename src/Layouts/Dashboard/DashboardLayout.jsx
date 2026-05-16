// DashboardLayout.jsx

import React, { useState } from "react";
import {
  LayoutDashboard,
  Swords,
  Trophy,
  Users,
  Newspaper,
  Home,
  Menu,
  X,
} from "lucide-react";

import { Link, NavLink, Outlet } from "react-router-dom";
import DashboardNav from "../../Shared/DashNav/DashNav";

const sidebarLinks = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },

  {
    name: "Matches",
    path: "/dashboard/matches",
    icon: Swords,
  },

  {
    name: "Teams",
    path: "/dashboard/teams",
    icon: Trophy,
  },

  {
    name: "Players",
    path: "/dashboard/players",
    icon: Users,
  },

  {
    name: "News",
    path: "/dashboard/news",
    icon: Newspaper,
  },
];

const DashboardLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#030B18] text-white">

      {/* SIDEBAR */}
      <aside
        className={`fixed lg:static top-0 left-0 z-50 w-[280px] h-screen bg-[#071120] border-r border-cyan-400/10 transition-all duration-300 ${
          mobileOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >

        {/* LOGO */}
        <div className="flex items-center justify-between h-20 px-6 border-b border-white/5">

          <h2 className="text-2xl font-extrabold tracking-tight uppercase">
            ADMIN
          </h2>

          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden"
          >
            <X size={22} />
          </button>
        </div>

        {/* NAV LINKS */}
        <div className="flex flex-col gap-2 p-4">

          {sidebarLinks.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.path === "/dashboard"}
                className={({ isActive }) =>
                  `flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 ${
                    isActive
                      ? "bg-cyan-400/10 text-cyan-300 border border-cyan-400/20 shadow-[0_0_30px_rgba(34,211,238,0.12)]"
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }`
                }
              >
                <Icon size={20} />

                <span className="font-medium">
                  {item.name}
                </span>
              </NavLink>
            );
          })}
        </div>

        {/* BOTTOM */}
        <div className="absolute bottom-0 left-0 w-full p-5 border-t border-white/5">

          <Link to='/'>
          <button className="flex items-center gap-3 text-gray-400 transition-all hover:text-white">

            <Home size={18} />

            Back to Website
          </button></Link>
        </div>
      </aside>

      {/* OVERLAY */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
        />
      )}

      {/* CONTENT */}
      <main className="flex-1">

        {/* TOP NAV */}
        <DashboardNav setMobileOpen={setMobileOpen} />

        {/* PAGE */}
        <div className="p-6 lg:p-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;