// TopGoalsPlayer.jsx

import React from "react";

import { Goal } from "lucide-react";

import { motion } from "framer-motion";

import {
  useQuery,
} from "@tanstack/react-query";

import useAxiosPublic from "../../Hooks/useAxiosPublic";

const TopGoalsPlayer = () => {
  const axiosPublic =
    useAxiosPublic();

  /* =========================
     GET TOP PLAYERS
  ========================= */
  const {
    data: players = [],
    isLoading,
  } = useQuery({
    queryKey: ["topPlayers"],

    queryFn: async () => {
      const res =
        await axiosPublic.get(
          "/players"
        );

      return res.data;
    },
  });

  /* =========================
     TOP 5 PLAYERS
  ========================= */
  const topScorers =
    players.slice(0, 5);

  /* =========================
     LOADING
  ========================= */
  if (isLoading) {
    return (
      <section className="bg-[#030B18] py-20 px-6">

        <div className="mx-auto max-w-7xl">

          {/* HEADER */}
          <div className="mb-12">

            <div className="w-64 h-10 rounded-lg bg-[#071120] animate-pulse" />

            <div className="w-48 h-4 mt-4 rounded bg-[#071120] animate-pulse" />
          </div>

          {/* SKELETON */}
          <div className="space-y-4">

            {[1, 2, 3, 4, 5].map(
              (item) => (
                <div
                  key={item}
                  className="h-[95px] rounded-2xl bg-[#071120] animate-pulse"
                />
              )
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#030B18] py-20 px-6">

      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <div className="mb-12">

          <h2 className="text-4xl font-extrabold tracking-tight text-white uppercase md:text-5xl">

            Top Scorers
          </h2>

          <p className="mt-3 text-sm text-gray-400 md:text-base">

            The goal machines of
            the tournament
          </p>

          <div className="w-14 h-[2px] mt-5 rounded-full bg-cyan-400" />
        </div>

        {/* EMPTY STATE */}
        {topScorers.length ===
          0 && (
          <div className="py-16 text-center border rounded-3xl border-cyan-400/10 bg-[#071120]">

            <h3 className="text-2xl font-bold text-white">

              No Players Found
            </h3>

            <p className="mt-3 text-gray-500">

              No scorer data
              available yet
            </p>
          </div>
        )}

        {/* LIST */}
        <div className="space-y-4">

          {topScorers.map(
            (
              player,
              index
            ) => {
              /* TEAM NAME */
              const teamName =
                player
                  ?.teamMembers?.[0]
                  ?.teamName ||
                "No Team";

              return (
                <motion.div
                  key={
                    player._id
                  }
                  initial={{
                    opacity: 0,
                    y: 40,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.5,
                    delay:
                      index *
                      0.08,
                  }}
                  viewport={{
                    once: true,
                  }}
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
                          index ===
                          0
                            ? "text-cyan-400"
                            : index ===
                              1
                            ? "text-purple-400"
                            : index ===
                              2
                            ? "text-yellow-400"
                            : "text-gray-500"
                        }`}
                      >
                        0
                        {index + 1}
                      </span>

                      {/* PLAYER IMAGE */}
                      <img
                        src={
                          player.photo ||
                          "https://i.ibb.co/jvY69xhW/player-icon.png"
                        }
                        alt={
                          player.name
                        }
                        className="object-cover border rounded-full w-14 h-14 border-white/10"
                      />

                      {/* INFO */}
                      <div>

                        <h3 className="text-sm font-bold text-white md:text-base">

                          {
                            player.name
                          }
                        </h3>

                        <p className="mt-1 text-xs text-gray-500">

                          {
                            teamName
                          }
                        </p>
                      </div>
                    </div>

                    {/* GOALS */}
                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-400/10">

                      <Goal
                        size={16}
                        className="text-cyan-400"
                      />

                      <span className="text-lg font-extrabold text-cyan-300">

                        {player.totalGoals ||
                          0}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            }
          )}
        </div>
      </div>
    </section>
  );
};

export default TopGoalsPlayer;