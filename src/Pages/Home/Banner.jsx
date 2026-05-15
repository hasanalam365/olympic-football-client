import React from "react";
import { Play, CalendarDays } from "lucide-react";

const Banner = () => {
  return (
    <section className="relative py-20 flex items-center justify-center  overflow-hidden bg-[#030B18]">

      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.12),transparent_35%)]" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,rgba(139,92,246,0.12),transparent_35%)]" />

      {/* CONTAINER */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full px-6 text-center max-w-7xl">

        {/* TOP BADGE */}
        <div className="flex items-center gap-2 px-4 mb-4 border rounded-full border-cyan-400/20 bg-cyan-400/5 backdrop-blur-md">

          <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />

          <span className="text-[11px] font-bold tracking-[2px] uppercase text-cyan-300">
            Tournament Live Now
          </span>
        </div>

        {/* MAIN TITLE */}
        <div className="space-y-0 leading-none">

          <h2 className="text-white font-extrabold uppercase tracking-tight text-[30px] md:text-[50px] lg:text-[70px]">
            THE
          </h2>

          <h1 className="font-extrabold uppercase tracking-tight text-[70px] md:text-[100px] lg:text-[120px]">
            <span className="text-cyan-400">ARENA</span>{" "}
            <span className="text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text">
              CUP
            </span>
          </h1>

          <h2 className="text-white font-extrabold uppercase tracking-tight text-[70px] md:text-[100px] lg:text-[120px]">
            2026
          </h2>
        </div>

        {/* DESCRIPTION */}
        <p className="max-w-2xl mt-8 text-lg leading-8 text-gray-400 md:text-xl">
          Experience the ultimate football championship. Live
          scores, real-time updates, and world-class
          coverage.
        </p>

        {/* BUTTONS */}
        <div className="flex flex-col items-center gap-5 mt-10 sm:flex-row">

          {/* LIVE BUTTON */}
          <button className="flex items-center gap-3 px-8 py-4 text-sm font-bold text-black transition-all duration-300 rounded-xl bg-cyan-400 hover:scale-105 hover:shadow-[0_0_40px_rgba(34,211,238,0.45)]">

            <Play size={18} fill="black" />

            Live Matches
          </button>

          {/* SCHEDULE BUTTON */}
          <button className="flex items-center gap-3 px-8 py-4 text-sm font-semibold text-white transition-all duration-300 border rounded-xl border-white/10 bg-white/5 hover:bg-white/10">

            <CalendarDays size={18} />

            View Schedule
          </button>
        </div>

        {/* LIVE SCORE CARD */}
        <div className="relative w-full max-w-md p-6 mt-16 overflow-hidden border shadow-2xl rounded-2xl border-cyan-400/20 bg-white/5 backdrop-blur-xl">

          {/* GLOW */}
          <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-cyan-400/20 blur-3xl" />

          {/* TOP */}
          <div className="flex items-center justify-between mb-5">

            <div className="flex items-center gap-2">

              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />

              <span className="text-xs font-bold tracking-widest text-red-400 uppercase">
                Live 67'
              </span>
            </div>

            <span className="text-xs text-gray-500 uppercase">
              Group
            </span>
          </div>

          {/* SCORE */}
          <div className="flex items-center justify-between">

            <h3 className="text-sm font-semibold text-white md:text-base">
              Phoenix United
            </h3>

            <div className="px-5 py-2 text-xl font-extrabold text-cyan-300 rounded-xl bg-cyan-400/10">
              2 - 1
            </div>

            <h3 className="text-sm font-semibold text-white md:text-base">
              Thunder FC
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;