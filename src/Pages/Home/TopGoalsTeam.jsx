// TopGoalsTeam.jsx

import React from "react";
import { Goal } from "lucide-react";
import { motion } from "framer-motion";

const scorers = [
  {
    id: 1,
    name: "Lucas Moreira",
    team: "Phoenix United",
    position: "FWD",
    goals: 5,
    short: "Lu",
  },

  {
    id: 2,
    name: "Erik Lindberg",
    team: "Royal Eagles",
    position: "MID",
    goals: 4,
    short: "Er",
  },

  {
    id: 3,
    name: "Ahmed Hassan",
    team: "Thunder FC",
    position: "FWD",
    goals: 3,
    short: "Ah",
  },

  {
    id: 4,
    name: "Diego Fernandez",
    team: "Royal Eagles",
    position: "FWD",
    goals: 3,
    short: "Di",
  },

  {
    id: 5,
    name: "Kenji Nakamura",
    team: "Falcon Athletic",
    position: "MID",
    goals: 2,
    short: "Ka",
  },
];

const TopGoalsTeam = () => {
  return (
    <section className="bg-[#030B18] py-20 px-6">

      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <div className="mb-12">

          <h2 className="text-4xl font-extrabold tracking-tight text-white uppercase md:text-5xl">
            Top Scorers
          </h2>

          <p className="mt-3 text-sm text-gray-400 md:text-base">
            The goal machines of the tournament
          </p>

          <div className="w-14 h-[2px] mt-5 rounded-full bg-cyan-400" />
        </div>

        {/* LIST */}
        <div className="space-y-4">

          {scorers.map((player, index) => (
            <motion.div
              key={player.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
              }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-2xl border border-cyan-400/10 bg-[#071120] px-5 py-5 transition-all duration-500 hover:border-cyan-400/30 hover:shadow-[0_0_35px_rgba(34,211,238,0.12)]"
            >

              {/* GLOW */}
              <div className="absolute top-0 right-0 w-32 h-32 transition-all duration-500 rounded-full opacity-0 blur-3xl bg-cyan-400/10 group-hover:opacity-100" />

              <div className="flex items-center justify-between">

                {/* LEFT */}
                <div className="flex items-center gap-5">

                  {/* RANK */}
                  <span
                    className={`text-xl font-extrabold w-6 ${
                      index === 0
                        ? "text-cyan-400"
                        : index === 1
                        ? "text-purple-400"
                        : "text-gray-500"
                    }`}
                  >
                    {player.id}
                  </span>

                  {/* AVATAR */}
                  <div className="flex items-center justify-center text-xs font-bold text-gray-300 rounded-full w-11 h-11 bg-white/10">
                    {player.short}
                  </div>

                  {/* INFO */}
                  <div>

                    <h3 className="text-sm font-bold text-white md:text-base">
                      {player.name}
                    </h3>

                    <p className="mt-1 text-xs text-gray-500">
                      {player.team} • {player.position}
                    </p>
                  </div>
                </div>

                {/* GOALS */}
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-400/10">

                  <Goal
                    size={15}
                    className="text-cyan-400"
                  />

                  <span className="text-lg font-extrabold text-cyan-300">
                    {player.goals}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopGoalsTeam;