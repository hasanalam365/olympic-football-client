// AdminMatches.jsx

import React from "react";

import {
  Plus,
  Pencil,
  Trash2,
  Radio,
} from "lucide-react";

import { motion } from "framer-motion";

const matches = [
  {
    id: 1,
    status: "scheduled",
    home: "Falcon Athletic",
    away: "Blaze Dynamo",
    score: "0-0",
  },

  {
    id: 2,
    status: "scheduled",
    home: "Storm City",
    away: "Iron Wolves",
    score: "0-0",
  },

  {
    id: 3,
    status: "live",
    home: "Phoenix United",
    away: "Thunder FC",
    score: "2-1",
  },

  {
    id: 4,
    status: "completed",
    home: "Royal Eagles",
    away: "Titan Warriors",
    score: "3-0",
  },

  {
    id: 5,
    status: "completed",
    home: "Phoenix United",
    away: "Storm City",
    score: "2-2",
  },

  {
    id: 6,
    status: "completed",
    home: "Royal Eagles",
    away: "Falcon Athletic",
    score: "2-1",
  },
];

const AdminMatches = () => {
  return (
    <section className="min-h-screen bg-[#030B18] text-white">

      {/* HEADER */}
      <div className="flex flex-col gap-5 mb-10 md:flex-row md:items-center md:justify-between">

        <div>

          <h2 className="text-4xl font-extrabold tracking-tight text-white">
            Matches
          </h2>

          <p className="mt-2 text-gray-400">
            Manage fixtures and live scores
          </p>
        </div>

        {/* ADD BUTTON */}
        <button className="flex items-center justify-center gap-3 px-6 text-sm font-bold text-black transition-all duration-300 h-14 rounded-2xl bg-cyan-300 hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(103,232,249,0.35)]">

          <Plus size={18} />

          Add Match
        </button>
      </div>

      {/* MATCHES */}
      <div className="space-y-5">

        {matches.map((match, index) => (
          <motion.div
            key={match.id}
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
              <div>

                {/* STATUS */}
                <div className="flex items-center gap-3 mb-3">

                  {/* LIVE ICON */}
                  {match.status === "live" && (
                    <Radio
                      size={13}
                      className="text-red-500 animate-pulse"
                    />
                  )}

                  <span
                    className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide ${
                      match.status === "live"
                        ? "bg-red-500/15 text-red-400"
                        : match.status === "scheduled"
                        ? "bg-cyan-400/10 text-cyan-300"
                        : "bg-white/10 text-gray-400"
                    }`}
                  >
                    {match.status}
                  </span>

                  <span className="text-xs tracking-[2px] uppercase text-gray-500">
                    Group
                  </span>
                </div>

                {/* MATCH TITLE */}
                <h3 className="text-lg font-bold text-white md:text-xl">

                  {match.home}

                  <span className="mx-2 text-cyan-300">
                    {match.score}
                  </span>

                  {match.away}
                </h3>
              </div>

              {/* ACTIONS */}
              <div className="flex items-center gap-3">

                {/* EVENTS */}
                <button className="px-5 h-11 rounded-xl border border-white/10 bg-[#0B1627] text-sm font-semibold text-white transition-all duration-300 hover:border-cyan-400/30 hover:text-cyan-300">

                  Events
                </button>

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
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default AdminMatches;