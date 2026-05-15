// Matches.jsx

import React, { useState } from "react";
import {
  Radio,
  Clock3,
} from "lucide-react";

import { motion } from "framer-motion";

const tabs = ["Live", "Upcoming", "Results"];

const matchesData = {
  Live: [
    {
      id: 1,
      home: "Phoenix United",
      away: "Thunder FC",
      homeShort: "Ph",
      awayShort: "Th",
      score: "2 - 1",
      stadium: "National Arena",
      live: true,
    },

    {
      id: 2,
      home: "Royal Eagles",
      away: "Titan Wolves",
      homeShort: "Ro",
      awayShort: "Ti",
      score: "2 - 0",
      stadium: "Grand Stadium",
      live: true,
    },

    {
      id: 3,
      home: "Phoenix United",
      away: "Blaze FC",
      homeShort: "Ph",
      awayShort: "Bl",
      score: "3 - 2",
      stadium: "Arena Dome",
      live: true,
    },
  ],

  Upcoming: [
    {
      id: 4,
      home: "Storm City",
      away: "Iron Wolves",
      homeShort: "St",
      awayShort: "Ir",
      score: "VS",
      stadium: "Thunder Park",
      live: false,
    },

    {
      id: 5,
      home: "Falcon Athletic",
      away: "Blaze Dynamo",
      homeShort: "Fa",
      awayShort: "Bl",
      score: "VS",
      stadium: "Eagle Arena",
      live: false,
    },
  ],

  Results: [
    {
      id: 6,
      home: "Royal Eagles",
      away: "Thunder FC",
      homeShort: "Ro",
      awayShort: "Th",
      score: "1 - 0",
      stadium: "Royal Stadium",
      live: false,
    },

    {
      id: 7,
      home: "Phoenix United",
      away: "Iron Wolves",
      homeShort: "Ph",
      awayShort: "Ir",
      score: "4 - 1",
      stadium: "Victory Arena",
      live: false,
    },
  ],
};

const Matches = () => {
  const [activeTab, setActiveTab] = useState("Live");

  return (
    <section className="min-h-screen bg-[#030B18] px-6 py-20">

      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <div className="mb-10">

          <h2 className="text-4xl font-extrabold tracking-tight text-white uppercase md:text-5xl">
            Matches
          </h2>

          <p className="mt-3 text-sm text-gray-400 md:text-base">
            All tournament matches
          </p>

          <div className="w-14 h-[2px] mt-5 rounded-full bg-cyan-400" />
        </div>

        {/* TABS */}
        <div className="flex items-center gap-3 mb-10">

          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-300 border ${
                activeTab === tab
                  ? "bg-cyan-400 text-black border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.35)]"
                  : "bg-white/5 text-gray-300 border-white/10 hover:border-cyan-400/30 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* MATCH LIST */}
        <div className="space-y-5">

          {matchesData[activeTab].map((match, index) => (
            <motion.div
              key={match.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
              }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-3xl border border-cyan-400/10 bg-[#071120] p-6 transition-all duration-500 hover:border-cyan-400/30 hover:shadow-[0_0_40px_rgba(34,211,238,0.12)]"
            >

              {/* GLOW */}
              <div className="absolute top-0 right-0 transition-all duration-500 rounded-full opacity-0 w-36 h-36 blur-3xl bg-cyan-400/10 group-hover:opacity-100" />

              {/* TOP */}
              <div className="flex items-center justify-between mb-7">

                {/* LIVE STATUS */}
                <div className="flex items-center gap-2">

                  {match.live ? (
                    <>
                      <Radio
                        size={14}
                        className="text-red-500 animate-pulse"
                      />

                      <span className="text-xs font-bold tracking-[2px] uppercase text-red-400">
                        Live Match
                      </span>
                    </>
                  ) : (
                    <>
                      <Clock3
                        size={14}
                        className="text-cyan-400"
                      />

                      <span className="text-xs font-bold tracking-[2px] uppercase text-cyan-300">
                        Upcoming
                      </span>
                    </>
                  )}
                </div>

                {/* GROUP */}
                <span className="text-xs uppercase tracking-[2px] text-gray-500">
                  Group
                </span>
              </div>

              {/* MATCH CONTENT */}
              <div className="flex items-center justify-between gap-6">

                {/* HOME */}
                <div className="flex items-center gap-4">

                  <div className="flex items-center justify-center w-12 h-12 text-sm font-bold text-white rounded-full bg-white/10">
                    {match.homeShort}
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-white md:text-base">
                      {match.home}
                    </h3>

                    <p className="mt-1 text-xs text-gray-500">
                      {match.stadium}
                    </p>
                  </div>
                </div>

                {/* SCORE */}
                <div className="px-5 py-2 rounded-xl bg-cyan-400/10 text-cyan-300 text-lg font-extrabold shadow-[0_0_20px_rgba(34,211,238,0.12)]">
                  {match.score}
                </div>

                {/* AWAY */}
                <div className="flex items-center gap-4">

                  <div className="text-right">
                    <h3 className="text-sm font-bold text-white md:text-base">
                      {match.away}
                    </h3>

                    <p className="mt-1 text-xs text-gray-500">
                      Stadium
                    </p>
                  </div>

                  <div className="flex items-center justify-center w-12 h-12 text-sm font-bold text-white rounded-full bg-white/10">
                    {match.awayShort}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Matches;