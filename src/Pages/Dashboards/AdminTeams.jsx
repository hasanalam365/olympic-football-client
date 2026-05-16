// AdminTeams.jsx

import React from "react";

import {
  Plus,
  Pencil,
  Trash2,
  Shield,
} from "lucide-react";

import { motion } from "framer-motion";

const teams = [
  {
    id: 1,
    short: "BLZ",
    name: "Blaze Dynamo",
    group: "Group B",
    record: "4-2-3-1",
    stats: "P3 W0 D1 L2",
    points: "1pts",
  },

  {
    id: 2,
    short: "FAL",
    name: "Falcon Athletic",
    group: "Group B",
    record: "4-3-3",
    stats: "P3 W1 D2 L0",
    points: "5pts",
  },

  {
    id: 3,
    short: "IRW",
    name: "Iron Wolves",
    group: "Group A",
    record: "4-3-3",
    stats: "P3 W0 D0 L3",
    points: "0pts",
  },

  {
    id: 4,
    short: "PHX",
    name: "Phoenix United",
    group: "Group A",
    record: "4-3-3",
    stats: "P3 W2 D1 L0",
    points: "7pts",
  },

  {
    id: 5,
    short: "RYE",
    name: "Royal Eagles",
    group: "Group B",
    record: "4-4-2",
    stats: "P3 W3 D0 L0",
    points: "9pts",
  },

  {
    id: 6,
    short: "STC",
    name: "Storm City",
    group: "Group A",
    record: "3-5-2",
    stats: "P3 W1 D1 L1",
    points: "4pts",
  },

  {
    id: 7,
    short: "THU",
    name: "Thunder FC",
    group: "Group A",
    record: "4-2-3-1",
    stats: "P3 W2 D0 L1",
    points: "6pts",
  },

  {
    id: 8,
    short: "TIT",
    name: "Titan Warriors",
    group: "Group B",
    record: "3-4-3",
    stats: "P3 W1 D0 L2",
    points: "3pts",
  },
];

const AdminTeams = () => {
  return (
    <section className="min-h-screen bg-[#030B18] text-white">

      {/* HEADER */}
      <div className="flex flex-col gap-5 mb-10 md:flex-row md:items-center md:justify-between">

        <div>

          <h2 className="text-4xl font-extrabold tracking-tight text-white">
            Teams
          </h2>

          <p className="mt-2 text-gray-400">
            Manage teams and standings
          </p>
        </div>

        {/* ADD BUTTON */}
        <button className="flex items-center justify-center gap-3 px-6 text-sm font-bold text-black transition-all duration-300 h-14 rounded-2xl bg-cyan-300 hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(103,232,249,0.35)]">

          <Plus size={18} />

          Add Team
        </button>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">

        {teams.map((team, index) => (
          <motion.div
            key={team.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.45,
              delay: index * 0.06,
            }}
            viewport={{ once: true }}
            className="group relative overflow-hidden rounded-2xl border border-cyan-400/10 bg-[#071120] p-6 transition-all duration-500 hover:border-cyan-400/30 hover:shadow-[0_0_35px_rgba(34,211,238,0.10)]"
          >

            {/* GLOW */}
            <div className="absolute top-0 right-0 w-40 h-40 transition-all duration-500 rounded-full opacity-0 blur-3xl bg-cyan-400/10 group-hover:opacity-100" />

            {/* TOP */}
            <div className="flex items-start gap-4">

              {/* LOGO */}
              <div className="flex items-center justify-center text-sm font-bold text-gray-300 w-14 h-14 rounded-2xl bg-white/10">

                {team.short}
              </div>

              {/* INFO */}
              <div>

                <h3 className="text-xl font-bold text-white transition-all duration-300 group-hover:text-cyan-300">
                  {team.name}
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  {team.group} • {team.record}
                </p>
              </div>
            </div>

            {/* STATS */}
            <div className="mt-6">

              <p className="text-sm text-gray-400">
                {team.stats}

                <span className="ml-2 font-bold text-cyan-300">
                  {team.points}
                </span>
              </p>
            </div>

            {/* ACTIONS */}
            <div className="flex items-center gap-3 mt-6">

              {/* EDIT */}
              <button className="flex items-center justify-center w-11 h-11 rounded-xl border border-white/10 bg-[#0B1627] transition-all duration-300 hover:border-cyan-400/30 hover:text-cyan-300">

                <Pencil size={17} />
              </button>

              {/* DELETE */}
              <button className="flex items-center justify-center w-11 h-11 rounded-xl border border-white/10 bg-[#0B1627] transition-all duration-300 hover:border-red-500/30 hover:text-red-400">

                <Trash2 size={17} />
              </button>

              {/* EXTRA ICON */}
              <div className="ml-auto">

                <Shield
                  size={18}
                  className="text-cyan-400/60"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default AdminTeams;