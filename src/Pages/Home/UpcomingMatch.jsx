// UpcomingMatch.jsx

import React from "react";
import {
  CalendarDays,
  MapPin,
} from "lucide-react";

import { motion } from "framer-motion";

const matches = [
  {
    id: 1,
    group: "GROUP",
    stadium: "Thunder Park",
    home: "Storm City",
    away: "Iron Wolves",
    homeShort: "St",
    awayShort: "Ir",
    date: "Sat, May 16 • 6:00 PM",
    glow: "group-hover:shadow-[0_0_45px_rgba(34,211,238,0.18)]",
    border: "group-hover:border-cyan-400/40",
  },

  {
    id: 2,
    group: "GROUP",
    stadium: "Eagle Arena",
    home: "Falcon Athletic",
    away: "Blaze Dynamo",
    homeShort: "Fa",
    awayShort: "Bl",
    date: "Sun, May 17 • 8:00 PM",
    glow: "group-hover:shadow-[0_0_45px_rgba(139,92,246,0.18)]",
    border: "group-hover:border-purple-400/40",
  },
];

const UpcomingMatch = () => {
  return (
    <section className="bg-[#030B18] py-20 px-6">

      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <div className="mb-14">

          <h2 className="text-4xl font-extrabold tracking-tight text-white uppercase md:text-5xl">
            Upcoming Fixtures
          </h2>

          <p className="mt-3 text-sm text-gray-400 md:text-base">
            Don&apos;t miss the action
          </p>

          {/* LINE */}
          <div className="w-14 h-[2px] mt-5 bg-cyan-400 rounded-full" />
        </div>

        {/* MATCH GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">

          {matches.map((match, index) => (
            <motion.div
              key={match.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
              }}
              viewport={{ once: true }}
              className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-[#071120] p-7 transition-all duration-500 ${match.border} ${match.glow}`}
            >

              {/* HOVER GLOW */}
              <div className="absolute top-0 right-0 w-40 h-40 transition-all duration-500 rounded-full opacity-0 blur-3xl bg-cyan-400/10 group-hover:opacity-100" />

              {/* TOP */}
              <div className="flex items-center justify-between">

                <span className="text-xs tracking-[2px] font-semibold text-gray-500 uppercase">
                  {match.group}
                </span>

                <div className="flex items-center gap-2 text-xs text-gray-500">

                  <MapPin size={13} />

                  {match.stadium}
                </div>
              </div>

              {/* MATCH */}
              <div className="flex items-center justify-between mt-9">

                {/* HOME */}
                <div className="flex items-center gap-4">

                  <div className="flex items-center justify-center w-12 h-12 text-sm font-bold text-white rounded-full bg-white/10">
                    {match.homeShort}
                  </div>

                  <h3 className="text-base font-bold text-white">
                    {match.home}
                  </h3>
                </div>

                {/* VS */}
                <span className="text-sm font-semibold tracking-[3px] text-gray-500 uppercase">
                  VS
                </span>

                {/* AWAY */}
                <div className="flex items-center gap-4">

                  <h3 className="text-base font-bold text-white">
                    {match.away}
                  </h3>

                  <div className="flex items-center justify-center w-12 h-12 text-sm font-bold text-white rounded-full bg-white/10">
                    {match.awayShort}
                  </div>
                </div>
              </div>

              {/* DIVIDER */}
              <div className="h-px my-7 bg-white/10" />

              {/* DATE */}
              <div className="flex items-center gap-3 text-sm text-gray-400">

                <CalendarDays
                  size={16}
                  className="text-cyan-400"
                />

                {match.date}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingMatch;