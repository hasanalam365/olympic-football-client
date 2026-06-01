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
  LogOut,
} from "lucide-react";

import {
  Link,
  NavLink,
  Outlet,
  useNavigate,
} from "react-router-dom";

import Swal from "sweetalert2";

import DashboardNav from "../../Shared/DashNav/DashNav";
import useAuth from "../../Hooks/useAuth";

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
    name: "Next Match",
    path: "/dashboard/next-match",
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
  const [mobileOpen, setMobileOpen] =
    useState(false);

  const { logOut } = useAuth();

  const navigate = useNavigate();

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Logout?",
      text: "Do you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#06b6d4",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, Logout",
    });

    if (result.isConfirmed) {
      try {
        await logOut();

        localStorage.removeItem(
          "access-token"
        );

        Swal.fire({
          icon: "success",
          title: "Logged Out Successfully",
          timer: 1500,
          showConfirmButton: false,
        });

        navigate("/login");
      } catch (error) {
        console.log(error);

        Swal.fire({
          icon: "error",
          title: "Logout Failed",
        });
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-[#030B18] text-white">

      {/* MOBILE MENU BUTTON */}
      <button
        onClick={() =>
          setMobileOpen(true)
        }
        className="fixed z-40 p-3 rounded-full lg:hidden top-4 left-4 bg-cyan-500/20 backdrop-blur"
      >
        <Menu size={22} />
      </button>

      {/* SIDEBAR */}
      <aside
        className={`fixed lg:static top-0 left-0 z-50 w-[280px] h-screen bg-[#071120] border-r border-cyan-400/10 transition-all duration-300 ${
          mobileOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >

        {/* HEADER */}
        <div className="flex items-center justify-between h-20 px-6 border-b border-white/5">

          <h2 className="text-2xl font-extrabold tracking-tight uppercase">
            ADMIN
          </h2>

          <button
            onClick={() =>
              setMobileOpen(false)
            }
            className="lg:hidden"
          >
            <X size={22} />
          </button>
        </div>

        {/* LINKS */}
        <div className="flex flex-col gap-2 p-4">

          {sidebarLinks.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.name}
                to={item.path}
                end={
                  item.path ===
                  "/dashboard"
                }
                className={({
                  isActive,
                }) =>
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

          <div className="flex flex-col gap-3">

            <Link to="/">
              <button className="flex items-center w-full gap-3 px-4 py-3 text-gray-400 transition-all rounded-xl hover:bg-white/5 hover:text-white">

                <Home size={18} />

                Back To Website
              </button>
            </Link>

            <button
              onClick={
                handleLogout
              }
              className="flex items-center w-full gap-3 px-4 py-3 text-red-400 transition-all rounded-xl hover:bg-red-500/10 hover:text-red-300"
            >
              <LogOut size={18} />

              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* OVERLAY */}
      {mobileOpen && (
        <div
          onClick={() =>
            setMobileOpen(false)
          }
          className="fixed inset-0 z-40 bg-black/70 lg:hidden"
        />
      )}

      {/* CONTENT */}
      <main className="flex-1">

        <DashboardNav
          setMobileOpen={
            setMobileOpen
          }
        />

        <div className="p-6 lg:p-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;