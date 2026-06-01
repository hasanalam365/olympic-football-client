import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";

import {
  Search,
  Trophy,
  Target,
  Shield,
  X,
  Phone,
  User,
  Heart,
} from "lucide-react";

import useAxiosPublic from "../../Hooks/useAxiosPublic";
import PageLoader from "../../Routes/PrivateRoute/PageLoading";

const Players = () => {
  const axiosPublic = useAxiosPublic();

  const [search, setSearch] =
    useState("");

  const [selectedPlayer,
    setSelectedPlayer] =
    useState(null);

  const {
    data: players = [],
    isLoading,
  } = useQuery({
    queryKey: ["players"],
    queryFn: async () => {
      const res =
        await axiosPublic.get(
          "/players"
        );

      return res.data;
    },
  });

  if (isLoading)
    return <PageLoader />;

  const filteredPlayers =
    players.filter((player) =>
      player.name
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  return (
    <section className="min-h-screen bg-[#030B18] py-20 px-5">

      <div className="mx-auto max-w-7xl">

        {/* HEADER */}

        <div className="mb-12">

          <h2 className="text-5xl font-black text-white uppercase">
            Players
          </h2>

          <p className="mt-3 text-gray-400">
            All registered players
            and statistics
          </p>

          <div className="w-16 h-[3px] mt-5 rounded-full bg-cyan-400" />

        </div>

        {/* SEARCH */}

        <div className="relative max-w-md mb-10">

          <Search
            size={18}
            className="absolute text-gray-500 -translate-y-1/2 left-4 top-1/2"
          />

          <input
            type="text"
            placeholder="Search Player..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="w-full py-4 pl-12 pr-4 text-white border rounded-2xl bg-[#071120] border-cyan-400/10 focus:outline-none focus:border-cyan-400"
          />
        </div>

        {/* TOP SCORERS */}

        <div className="grid grid-cols-1 gap-5 mb-10 md:grid-cols-3">

          {players
            .sort(
              (a, b) =>
                b.totalGoals -
                a.totalGoals
            )
            .slice(0, 3)
            .map((player, index) => (
              <div
                key={player._id}
                className="p-5 border rounded-3xl border-cyan-400/10 bg-[#071120]"
              >

                <div className="flex items-center gap-4">

                  <img
                    src={player.photo}
                    alt=""
                    className="object-cover w-16 h-16 border rounded-2xl border-cyan-400/20"
                  />

                  <div>

                    <h3 className="font-bold text-white">
                      {player.name}
                    </h3>

                    <p className="text-sm text-gray-400">
                      #{index + 1} Top
                      Scorer
                    </p>

                  </div>

                </div>

                <div className="mt-4">

                  <span className="text-3xl font-black text-cyan-300">
                    {
                      player.totalGoals
                    }
                  </span>

                  <span className="ml-2 text-gray-400">
                    Goals
                  </span>

                </div>

              </div>
            ))}
        </div>

        {/* PLAYERS */}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">

          {filteredPlayers.map(
            (player, index) => (
              <motion.div
                key={player._id}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay:
                    index * 0.05,
                }}
                viewport={{
                  once: true,
                }}
                onClick={() =>
                  setSelectedPlayer(
                    player
                  )
                }
                className="cursor-pointer rounded-3xl border border-cyan-400/10 bg-[#071120] p-5 hover:border-cyan-400/30 transition-all duration-300"
              >

                <img
                  src={player.photo}
                  alt=""
                  className="object-cover mx-auto border w-28 h-28 rounded-3xl border-cyan-400/20"
                />

                <h3 className="mt-4 text-xl font-bold text-center text-white">
                  {player.name}
                </h3>

                <p className="mt-1 text-sm text-center text-gray-400">
                  Age {player.age}
                </p>

                <div className="grid grid-cols-2 gap-3 mt-5">

                  <div className="p-3 text-center rounded-xl bg-white/5">

                    <h4 className="text-xl font-bold text-cyan-300">
                      {
                        player.totalGoals
                      }
                    </h4>

                    <p className="text-xs text-gray-400">
                      Goals
                    </p>

                  </div>

                  <div className="p-3 text-center rounded-xl bg-white/5">

                    <h4 className="text-xl font-bold text-green-400">
                      {
                        player.match
                      }
                    </h4>

                    <p className="text-xs text-gray-400">
                      Match
                    </p>

                  </div>

                </div>

              </motion.div>
            )
          )}
        </div>

        {/* MODAL */}

        <AnimatePresence>

          {selectedPlayer && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">

              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.9,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                }}
                className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-cyan-400/20 bg-[#071120]"
              >

                <button
                  onClick={() =>
                    setSelectedPlayer(
                      null
                    )
                  }
                  className="absolute z-50 flex items-center justify-center w-10 h-10 rounded-full top-5 right-5 bg-white/10 hover:bg-red-500"
                >
                  <X size={18} />
                </button>

                <div className="h-48 bg-gradient-to-r from-cyan-600/20 via-blue-600/20 to-purple-600/20" />

                <div className="px-8 pb-8">

                  <img
                    src={
                      selectedPlayer.photo
                    }
                    alt=""
                    className="object-cover border-4 w-28 h-28 rounded-3xl border-[#071120] -mt-14"
                  />

                  <h2 className="mt-4 text-3xl font-black text-white">
                    {
                      selectedPlayer.name
                    }
                  </h2>

                  <div className="grid grid-cols-1 gap-4 mt-8 md:grid-cols-3">

                    <div className="p-5 rounded-2xl bg-white/5">

                      <User className="mb-2 text-cyan-400" />

                      <p className="text-gray-400">
                        Age
                      </p>

                      <h4 className="font-bold text-white">
                        {
                          selectedPlayer.age
                        }
                      </h4>

                    </div>

                    <div className="p-5 rounded-2xl bg-white/5">

                      <Phone className="mb-2 text-cyan-400" />

                      <p className="text-gray-400">
                        Phone
                      </p>

                      <h4 className="font-bold text-white">
                        {
                          selectedPlayer.phoneNumber
                        }
                      </h4>

                    </div>

                    <div className="p-5 rounded-2xl bg-white/5">

                      <Heart className="mb-2 text-cyan-400" />

                      <p className="text-gray-400">
                        Blood Group
                      </p>

                      <h4 className="font-bold text-white">
                        {selectedPlayer.bloodGroup ||
                          "N/A"}
                      </h4>

                    </div>

                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-8 md:grid-cols-4">

                    <div className="p-4 text-center rounded-2xl bg-white/5">
                      <h3 className="text-3xl font-black text-cyan-300">
                        {
                          selectedPlayer.totalGoals
                        }
                      </h3>
                      <p className="text-gray-400">
                        Goals
                      </p>
                    </div>

                    <div className="p-4 text-center rounded-2xl bg-white/5">
                      <h3 className="text-3xl font-black text-green-400">
                        {
                          selectedPlayer.match
                        }
                      </h3>
                      <p className="text-gray-400">
                        Matches
                      </p>
                    </div>

                    <div className="p-4 text-center rounded-2xl bg-white/5">
                      <h3 className="text-3xl font-black text-yellow-400">
                        {
                          selectedPlayer.yellowCards
                        }
                      </h3>
                      <p className="text-gray-400">
                        Yellow
                      </p>
                    </div>

                    <div className="p-4 text-center rounded-2xl bg-white/5">
                      <h3 className="text-3xl font-black text-red-400">
                        {
                          selectedPlayer.redCards
                        }
                      </h3>
                      <p className="text-gray-400">
                        Red
                      </p>
                    </div>

                  </div>

                  <div className="mt-10">

                    <h3 className="mb-5 text-2xl font-bold text-white">
                      Team History
                    </h3>

                    <div className="space-y-4">

                      {selectedPlayer?.teamMembers?.map(
                        (
                          team,
                          index
                        ) => (
                          <div
                            key={index}
                            className="p-5 rounded-2xl bg-white/5"
                          >

                            <h4 className="font-bold text-cyan-300">
                              {
                                team.teamName
                              }
                            </h4>

                            <div className="grid grid-cols-3 gap-4 mt-3">

                              <div>
                                <p className="text-xs text-gray-500">
                                  Year
                                </p>
                                <p className="text-white">
                                  {team.year}
                                </p>
                              </div>

                              <div>
                                <p className="text-xs text-gray-500">
                                  Goals
                                </p>
                                <p className="text-white">
                                  {team.goals}
                                </p>
                              </div>

                              <div>
                                <p className="text-xs text-gray-500">
                                  Match
                                </p>
                                <p className="text-white">
                                  {team.match}
                                </p>
                              </div>

                            </div>

                          </div>
                        )
                      )}

                    </div>

                  </div>

                </div>

              </motion.div>

            </div>
          )}

        </AnimatePresence>

      </div>
    </section>
  );
};

export default Players;