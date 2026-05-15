// PointTables.jsx

import React, { useState } from "react";
import { motion } from "framer-motion";

const groups = {
  "Group A": [
    {
      pos: 1,
      team: "Phoenix United",
      short: "PHX",
      p: 3,
      w: 2,
      d: 1,
      l: 0,
      gf: 7,
      ga: 2,
      gd: 5,
      pts: 7,
    },

    {
      pos: 2,
      team: "Thunder FC",
      short: "THU",
      p: 3,
      w: 2,
      d: 0,
      l: 1,
      gf: 5,
      ga: 3,
      gd: 2,
      pts: 6,
    },

    {
      pos: 3,
      team: "Storm City",
      short: "STC",
      p: 3,
      w: 1,
      d: 1,
      l: 1,
      gf: 4,
      ga: 4,
      gd: 0,
      pts: 4,
    },

    {
      pos: 4,
      team: "Iron Wolves",
      short: "IRW",
      p: 3,
      w: 0,
      d: 0,
      l: 3,
      gf: 1,
      ga: 8,
      gd: -7,
      pts: 0,
    },
  ],

  "Group B": [
    {
      pos: 1,
      team: "Royal Eagles",
      short: "RYE",
      p: 3,
      w: 3,
      d: 0,
      l: 0,
      gf: 9,
      ga: 1,
      gd: 8,
      pts: 9,
    },

    {
      pos: 2,
      team: "Falcon Athletic",
      short: "FAL",
      p: 3,
      w: 1,
      d: 2,
      l: 0,
      gf: 5,
      ga: 3,
      gd: 2,
      pts: 5,
    },

    {
      pos: 3,
      team: "Titan Warriors",
      short: "TIT",
      p: 3,
      w: 1,
      d: 0,
      l: 2,
      gf: 3,
      ga: 6,
      gd: -3,
      pts: 3,
    },

    {
      pos: 4,
      team: "Blaze Dynamo",
      short: "BLZ",
      p: 3,
      w: 0,
      d: 1,
      l: 2,
      gf: 2,
      ga: 7,
      gd: -5,
      pts: 1,
    },
  ],
};

const PointTables = () => {
  const [activeTab, setActiveTab] = useState("All Groups");

  return (
    <section className="min-h-screen bg-[#030B18] px-6 py-20">

      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <div className="mb-10">

          <h2 className="text-4xl font-extrabold tracking-tight text-white uppercase md:text-5xl">
            Point Table
          </h2>

          <p className="mt-3 text-sm text-gray-400 md:text-base">
            Group stage tables
          </p>

          <div className="w-14 h-[2px] mt-5 rounded-full bg-cyan-400" />
        </div>

        {/* FILTERS */}
        <div className="flex items-center gap-3 mb-10">

          {["All Groups", "Group A", "Group B"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-xl text-sm font-semibold border transition-all duration-300 ${
                activeTab === tab
                  ? "bg-cyan-400 text-black border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.35)]"
                  : "bg-white/5 text-gray-300 border-white/10 hover:border-cyan-400/30 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* TABLES */}
        <div className="space-y-8">

          {(activeTab === "All Groups"
            ? Object.entries(groups)
            : [[activeTab, groups[activeTab]]]
          ).map(([groupName, teams], groupIndex) => (
            <motion.div
              key={groupName}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: groupIndex * 0.1,
              }}
              viewport={{ once: true }}
              className="overflow-hidden border rounded-3xl border-cyan-400/10 bg-[#071120]"
            >

              {/* GROUP TITLE */}
              <div className="px-6 py-5 border-b border-white/10">

                <h3 className="text-lg font-extrabold tracking-wide uppercase text-cyan-400">
                  {groupName}
                </h3>
              </div>

              {/* TABLE */}
              <div className="overflow-x-auto">

                <table className="w-full min-w-[900px]">

                  {/* HEAD */}
                  <thead className="border-b border-white/10">

                    <tr className="text-xs uppercase tracking-[2px] text-gray-500">

                      <th className="px-6 py-5 text-left">#</th>

                      <th className="px-6 py-5 text-left">
                        Team
                      </th>

                      <th className="px-4 py-5">P</th>

                      <th className="px-4 py-5">W</th>

                      <th className="px-4 py-5">D</th>

                      <th className="px-4 py-5">L</th>

                      <th className="px-4 py-5">GF</th>

                      <th className="px-4 py-5">GA</th>

                      <th className="px-4 py-5">GD</th>

                      <th className="px-4 py-5">PTS</th>
                    </tr>
                  </thead>

                  {/* BODY */}
                  <tbody>

                    {teams.map((team, index) => (
                      <tr
                        key={index}
                        className="transition-all duration-300 border-b border-white/5 hover:bg-cyan-400/5"
                      >

                        {/* POSITION */}
                        <td className="px-6 py-5 text-sm font-semibold text-white">
                          {team.pos}
                        </td>

                        {/* TEAM */}
                        <td className="px-6 py-5">

                          <div className="flex items-center gap-4">

                            <div className="flex items-center justify-center w-9 h-9 text-[11px] font-bold text-gray-300 rounded-full bg-white/10">
                              {team.short}
                            </div>

                            <span className="font-semibold text-white">
                              {team.team}
                            </span>
                          </div>
                        </td>

                        {/* STATS */}
                        <td className="px-4 py-5 font-medium text-center text-white">
                          {team.p}
                        </td>

                        <td className="px-4 py-5 font-bold text-center text-green-400">
                          {team.w}
                        </td>

                        <td className="px-4 py-5 font-bold text-center text-white">
                          {team.d}
                        </td>

                        <td className="px-4 py-5 font-bold text-center text-red-400">
                          {team.l}
                        </td>

                        <td className="px-4 py-5 font-medium text-center text-white">
                          {team.gf}
                        </td>

                        <td className="px-4 py-5 font-medium text-center text-white">
                          {team.ga}
                        </td>

                        <td className="px-4 py-5 font-bold text-center text-gray-300">
                          {team.gd}
                        </td>

                        <td className="px-4 py-5 font-extrabold text-center text-cyan-300">
                          {team.pts}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PointTables;