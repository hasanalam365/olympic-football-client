// Dashboard.jsx

import React from "react";

import {
  Trophy,
  Users,
  Swords,
  Radio,
  Goal,
  Newspaper,
} from "lucide-react";

import { motion } from "framer-motion";

const stats = [
  {
    title: "Teams",
    value: "8",
    icon: Trophy,
    color: "text-cyan-400",
  },

  {
    title: "Players",
    value: "10",
    icon: Users,
    color: "text-purple-400",
  },

  {
    title: "Matches",
    value: "6",
    icon: Swords,
    color: "text-yellow-400",
  },

  {
    title: "Live Now",
    value: "1",
    icon: Radio,
    color: "text-red-400",
  },

  {
    title: "Total Goals",
    value: "21",
    icon: Goal,
    color: "text-green-400",
  },

  {
    title: "Articles",
    value: "3",
    icon: Newspaper,
    color: "text-pink-400",
  },
];

const recentMatches = [
  {
    home: "Falcon Athletic",
    away: "Blaze Dynamo",
    score: "May 17",
    status: "scheduled",
  },

  {
    home: "Storm City",
    away: "Iron Wolves",
    score: "May 16",
    status: "scheduled",
  },

  {
    home: "Phoenix United",
    away: "Thunder FC",
    score: "2-1",
    status: "live",
  },

  {
    home: "Royal Eagles",
    away: "Titan Warriors",
    score: "3-0",
    status: "completed",
  },

  {
    home: "Phoenix United",
    away: "Storm City",
    score: "2-2",
    status: "completed",
  },
];

const Dashboard = () => {
  return (
    <section>

      {/* STATS */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">

        {stats.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
              }}
              viewport={{ once: true }}
              className="relative overflow-hidden border rounded-3xl border-cyan-400/10 bg-[#071120] p-7 transition-all duration-500 hover:border-cyan-400/30 hover:shadow-[0_0_40px_rgba(34,211,238,0.12)]"
            >

              {/* GLOW */}
              <div className="absolute top-0 right-0 w-32 h-32 transition-all duration-500 rounded-full opacity-0 blur-3xl bg-cyan-400/10 hover:opacity-100" />

              {/* TOP */}
              <div className="flex items-center justify-between">

                <span className="text-sm tracking-[2px] uppercase text-gray-500">
                  {item.title}
                </span>

                <Icon
                  size={18}
                  className={item.color}
                />
              </div>

              {/* VALUE */}
              <h2 className="mt-6 text-5xl font-extrabold text-white">
                {item.value}
              </h2>
            </motion.div>
          );
        })}
      </div>

      {/* RECENT MATCHES */}
      <div className="mt-10 overflow-hidden border rounded-3xl border-cyan-400/10 bg-[#071120]">

        {/* HEADER */}
        <div className="py-6 border-b px-7 border-white/10">

          <h3 className="text-2xl font-extrabold text-white">
            Recent Matches
          </h3>
        </div>

        {/* LIST */}
        <div className="divide-y divide-white/5">

          {recentMatches.map((match, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-5 transition-all duration-300 px-7 hover:bg-cyan-400/5"
            >

              {/* HOME */}
              <h4 className="font-semibold text-white">
                {match.home}
              </h4>

              {/* SCORE */}
              <div className="px-4 py-2 text-sm font-bold rounded-lg bg-cyan-400/10 text-cyan-300">
                {match.score}
              </div>

              {/* RIGHT */}
              <div className="flex items-center gap-4">

                <h4 className="font-semibold text-white">
                  {match.away}
                </h4>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${
                    match.status === "live"
                      ? "bg-red-500/15 text-red-400"
                      : match.status === "scheduled"
                      ? "bg-cyan-400/10 text-cyan-300"
                      : "bg-white/10 text-gray-400"
                  }`}
                >
                  {match.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;