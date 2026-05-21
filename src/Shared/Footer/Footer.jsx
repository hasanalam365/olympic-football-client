// Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import {
  Trophy,
  Instagram,
  Facebook,
  Twitter,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function Footer() {
  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Matches", path: "/matches" },
    { name: "Point Table", path: "/pointTable" },
    { name: "Teams", path: "/teams" },
    { name: "Players", path: "/players" },
    { name: "News", path: "/news" },
  ];

  const usefulLinks = [
    { name: "Privacy Policy", path: "/privacy-policy" },
    { name: "Terms & Conditions", path: "/terms-and-conditions" },
    { name: "Return & Refunds", path: "/return-and-refunds" },
    { name: "Admin Panel", path: "/dashboard" },
  ];

  return (
    <footer className="relative pt-20 pb-8 overflow-hidden text-white border-t border-cyan-500/20 bg-[#071120]">

      {/* BG EFFECT */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute rounded-full w-72 h-72 bg-cyan-500/10 blur-3xl -top-20 -left-20" />
        <div className="absolute bottom-0 right-0 rounded-full w-80 h-80 bg-cyan-400/5 blur-3xl" />
      </div>

      <div className="relative z-10 px-6 mx-auto max-w-7xl">

        {/* TOP GRID */}
        <div className="grid grid-cols-1 gap-12 pb-16 border-b md:grid-cols-2 lg:grid-cols-4 border-cyan-500/10">

          {/* BRAND */}
          <div>
            <Link to="/" className="flex items-center gap-3 mb-5">

              {/* ICON */}
              <div className="flex items-center justify-center w-11 h-11 rounded-2xl bg-cyan-400/10 border border-cyan-400/20 shadow-[0_0_20px_rgba(34,211,238,0.15)]">
                <Trophy
                  size={20}
                  className="text-cyan-300"
                  strokeWidth={2.2}
                />
              </div>

              {/* TEXT */}
              <div className="flex items-center text-2xl font-extrabold tracking-wide uppercase">
                <span className="text-white">SOT</span>
                <span className="text-cyan-400">2026</span>
              </div>
            </Link>

            <p className="max-w-sm text-sm leading-relaxed text-gray-400">
             সর্দারবাড়ী অলিম্পিক টুর্নামেন্ট (পঞ্চম আসর)
            </p>

            {/* SOCIAL */}
            <div className="flex gap-4 mt-6">

              <a
                href="#"
                className="flex items-center justify-center w-10 h-10 transition-all duration-300 border rounded-xl border-cyan-400/20 bg-cyan-400/10 text-cyan-300 hover:bg-cyan-400/20 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]"
              >
                <Facebook size={18} />
              </a>

              <a
                href="#"
                className="flex items-center justify-center w-10 h-10 transition-all duration-300 border rounded-xl border-cyan-400/20 bg-cyan-400/10 text-cyan-300 hover:bg-cyan-400/20 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]"
              >
                <Instagram size={18} />
              </a>

              <a
                href="#"
                className="flex items-center justify-center w-10 h-10 transition-all duration-300 border rounded-xl border-cyan-400/20 bg-cyan-400/10 text-cyan-300 hover:bg-cyan-400/20 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]"
              >
                <Twitter size={18} />
              </a>

            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4 className="mb-6 text-sm font-semibold tracking-[3px] uppercase text-cyan-300">
              Quick Links
            </h4>

            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="inline-block text-sm text-gray-400 transition-all duration-300 hover:text-cyan-300 hover:translate-x-1"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* USEFUL LINKS */}
          <div>
            <h4 className="mb-6 text-sm font-semibold tracking-[3px] uppercase text-cyan-300">
              Useful Links
            </h4>

            <ul className="space-y-4">
              {usefulLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="inline-block text-sm text-gray-400 transition-all duration-300 hover:text-cyan-300 hover:translate-x-1"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="mb-6 text-sm font-semibold tracking-[3px] uppercase text-cyan-300">
              Contact Developer
            </h4>

            <div className="space-y-5">

              <div className="flex items-start gap-3">
                <div className="p-2 border rounded-lg border-cyan-400/20 bg-cyan-400/10">
                  <Mail size={16} className="text-cyan-300" />
                </div>

                <div>
                  <p className="mb-1 text-xs text-gray-500 uppercase">
                    Email
                  </p>
                  <p className="text-sm text-gray-300">
                    hasanalam365@email.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 border rounded-lg border-cyan-400/20 bg-cyan-400/10">
                  <Phone size={16} className="text-cyan-300" />
                </div>

                <div>
                  <p className="mb-1 text-xs text-gray-500 uppercase">
                    Phone
                  </p>
                  <p className="text-sm text-gray-300">
                    +880 1645-782626
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 border rounded-lg border-cyan-400/20 bg-cyan-400/10">
                  <MapPin size={16} className="text-cyan-300" />
                </div>

                <div>
                  <p className="mb-1 text-xs text-gray-500 uppercase">
                    Location
                  </p>
                  <p className="text-sm text-gray-300">
                    Dhaka, Bangladesh
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="flex flex-col items-center justify-between gap-4 pt-8 md:flex-row">

          <p className="text-sm text-gray-500">
            © 2026 ArenaCup. All rights reserved.
          </p>

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>Developed by</span>

            <span className="font-semibold text-cyan-300">
              Hasan Alam
            </span>
          </div>

        </div>
      </div>
    </footer>
  );
}