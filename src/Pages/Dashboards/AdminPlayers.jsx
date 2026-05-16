// AdminPlayers.jsx

import React from "react";

import {
  Plus,
  Pencil,
  Trash2,
} from "lucide-react";

import { motion } from "framer-motion";

const players = [
  {
    id: 1,
    short: "A",
    name: "Ahmed Hassan",
    team: "Thunder FC",
    position: "FWD",
    number: "#17",
    goals: 3,
    assists: 1,
  },

  {
    id: 2,
    short: "D",
    name: "Diego Fernandez",
    team: "Royal Eagles",
    position: "FWD",
    number: "#11",
    goals: 3,
    assists: 3,
  },

  {
    id: 3,
    short: "E",
    name: "Erik Lindberg",
    team: "Royal Eagles",
    position: "MID",
    number: "#10",
    goals: 4,
    assists: 5,
  },

  {
    id: 4,
    short: "K",
    name: "Kenji Nakamura",
    team: "Falcon Athletic",
    position: "MID",
    number: "#8",
    goals: 2,
    assists: 4,
  },

  {
    id: 5,
    short: "L",
    name: "Lucas Moreira",
    team: "Phoenix United",
    position: "FWD",
    number: "#9",
    goals: 5,
    assists: 2,
  },

  {
    id: 6,
    short: "M",
    name: "Marcus Stone",
    team: "Phoenix United",
    position: "GK",
    number: "#1",
    goals: 0,
    assists: 0,
  },
];

const AdminPlayers = () => {
  return (
    <section className="min-h-screen bg-[#030B18] text-white">

      {/* HEADER */}
      <div className="flex flex-col gap-5 mb-10 md:flex-row md:items-center md:justify-between">

        <div>

          <h2 className="text-4xl font-extrabold tracking-tight text-white">
            Players
          </h2>

          <p className="mt-2 text-gray-400">
            Manage players and stats
          </p>
        </div>

        {/* BUTTON */}
        <button className="flex items-center justify-center gap-3 px-6 text-sm font-bold text-black transition-all duration-300 h-14 rounded-2xl bg-cyan-300 hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(103,232,249,0.35)]">

          <Plus size={18} />

          Add Player
        </button>
      </div>

      {/* PLAYERS */}
      <div className="space-y-5">

        {players.map((player, index) => (
          <motion.div
            key={player.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.45,
              delay: index * 0.06,
            }}
            viewport={{ once: true }}
            className="group relative overflow-hidden rounded-2xl border border-cyan-400/10 bg-[#071120] px-6 py-5 transition-all duration-500 hover:border-cyan-400/30 hover:shadow-[0_0_35px_rgba(34,211,238,0.10)]"
          >

            {/* GLOW */}
            <div className="absolute top-0 right-0 w-40 h-40 transition-all duration-500 rounded-full opacity-0 blur-3xl bg-cyan-400/10 group-hover:opacity-100" />

            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

              {/* LEFT */}
              <div className="flex items-center gap-5">

                {/* AVATAR */}
                <div className="flex items-center justify-center text-lg font-bold text-gray-300 rounded-full w-14 h-14 bg-white/10">
                  {player.short}
                </div>

                {/* INFO */}
                <div>

                  <h3 className="text-lg font-bold text-white transition-all duration-300 group-hover:text-cyan-300">
                    {player.name}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    {player.team} • {player.position} • {player.number}
                  </p>
                </div>
              </div>

              {/* RIGHT */}
              <div className="flex items-center gap-6">

                {/* STATS */}
                <div className="flex items-center gap-5 text-sm">

                  <div className="text-gray-400">
                    {player.goals}G
                  </div>

                  <div className="text-gray-400">
                    {player.assists}A
                  </div>

                  <div className="font-semibold text-cyan-300">
                    fit
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="flex items-center gap-3">

                  {/* EDIT */}
                  <button className="flex items-center justify-center w-11 h-11 rounded-xl border border-white/10 bg-[#0B1627] transition-all duration-300 hover:border-cyan-400/30 hover:text-cyan-300">

                    <Pencil size={17} />
                  </button>

                  {/* DELETE */}
                  <button className="flex items-center justify-center w-11 h-11 rounded-xl border border-white/10 bg-[#0B1627] transition-all duration-300 hover:border-red-500/30 hover:text-red-400">

                    <Trash2 size={17} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default AdminPlayers;