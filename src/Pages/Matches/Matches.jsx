import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Radio,
  Clock3,
  Calendar,
  Trophy,
} from "lucide-react";

import { motion } from "framer-motion";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import PageLoader from "../../Routes/PrivateRoute/PageLoading";

const tabs = [
  "Live",
  "Upcoming",
  "Results",
];

const Matches = () => {
  const [activeTab, setActiveTab] =
    useState("Live");

  const axiosPublic =
    useAxiosPublic();

  const {
    data: matches = [],
    isLoading,
  } = useQuery({
    queryKey: ["matches"],
    queryFn: async () => {
      const res =
        await axiosPublic.get(
          "/matches"
        );

      return res.data;
    },
  });

  if (isLoading)
    return <PageLoader />;

const liveMatches = matches.filter(
  (match) =>
    match.isLive === true &&
    !match.isResult
);

const upcomingMatches = matches.filter(
  (match) =>
    match.isUpcoming === true &&
    !match.isResult &&
    !match.isLive
);

const resultMatches = matches.filter(
  (match) =>
    match.isResult === true
);
  const currentMatches =
    activeTab === "Live"
      ? liveMatches
      : activeTab ===
        "Upcoming"
      ? upcomingMatches
      : resultMatches;

  return (
    <section className="min-h-screen bg-[#030B18] px-5 py-20">

      <div className="mx-auto max-w-7xl">

        {/* HEADER */}

        <div className="mb-12">

          <h2 className="text-5xl font-black text-white uppercase">
            Matches
          </h2>

          <p className="mt-3 text-gray-400">
            Tournament fixtures &
            results
          </p>

          <div className="w-16 h-[3px] mt-5 rounded-full bg-cyan-400" />
        </div>

        {/* TABS */}

        <div className="flex flex-wrap gap-3 mb-10">

          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() =>
                setActiveTab(tab)
              }
              className={`px-5 py-2 rounded-xl border transition-all ${
                activeTab === tab
                  ? "bg-cyan-400 text-black border-cyan-400"
                  : "bg-white/5 border-white/10 text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* MATCHES */}

        <div className="space-y-5">

          {currentMatches.length ===
          0 ? (
            <div className="py-24 text-center rounded-3xl bg-[#071120] border border-white/10">

              <Trophy
                size={50}
                className="mx-auto text-cyan-400"
              />

              <h3 className="mt-5 text-xl font-bold text-white">
                No Matches Found
              </h3>
            </div>
          ) : (
            currentMatches.map(
              (
                match,
                index
              ) => (
                <motion.div
                  key={match._id}
                  initial={{
                    opacity: 0,
                    y: 40,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.4,
                    delay:
                      index *
                      0.08,
                  }}
                  className="relative overflow-hidden rounded-3xl border border-cyan-400/10 bg-[#071120] p-6 hover:border-cyan-400/30"
                >

                  {/* STATUS */}

                  <div className="flex items-center justify-between mb-6">

                    <div className="flex items-center gap-2">

                      {activeTab ===
                      "Live" ? (
                        <>
                          <Radio
                            size={
                              14
                            }
                            className="text-red-500 animate-pulse"
                          />

                          <span className="text-xs font-bold tracking-wider text-red-400 uppercase">
                            Live
                          </span>
                        </>
                      ) : (
                        <>
                          <Clock3
                            size={
                              14
                            }
                            className="text-cyan-400"
                          />

                          <span className="text-xs font-bold tracking-wider uppercase text-cyan-300">
                            {
                              match.status
                            }
                          </span>
                        </>
                      )}
                    </div>

                    <span className="text-xs tracking-wider text-gray-500 uppercase">
                      {
                        match.group
                      }
                    </span>
                  </div>

                  {/* MATCH */}

                  <div className="grid items-center grid-cols-3 gap-4">

                    {/* HOME */}

                    <div className="text-center">

                      <h3 className="text-lg font-bold text-white">
                        {
                          match.homeTeam
                        }
                      </h3>
                    </div>

                    {/* SCORE */}

                    <div className="text-center">

                      <div className="px-5 py-3 rounded-xl bg-cyan-400/10">

                        {activeTab ===
                        "Upcoming" ? (
                          <span className="text-xl font-black text-cyan-300">
                            VS
                          </span>
                        ) : (
                          <span className="text-2xl font-black text-cyan-300">
                            {
                              match.homeScore
                            }{" "}
                            -
                            {" "}
                            {
                              match.awayScore
                            }
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-center gap-2 mt-3 text-xs text-gray-400">

                        <Calendar
                          size={
                            14
                          }
                        />

                        {
                          match.date
                        }

                        •

                        {
                          match.time
                        }
                      </div>
                    </div>

                    {/* AWAY */}

                    <div className="text-center">

                      <h3 className="text-lg font-bold text-white">
                        {
                          match.awayTeam
                        }
                      </h3>
                    </div>
                  </div>
                </motion.div>
              )
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default Matches;