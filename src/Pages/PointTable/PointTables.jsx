import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import { motion } from "framer-motion";

import useAxiosPublic from "../../Hooks/useAxiosPublic";

const PointTables = () => {
  const axiosPublic =
    useAxiosPublic();

  const [teams, setTeams] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [activeTab, setActiveTab] =
    useState("All Groups");

  useEffect(() => {
    const getTeams = async () => {
      try {
        const res =
          await axiosPublic.get(
            "/teams"
          );

        setTeams(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getTeams();
  }, [axiosPublic]);

  const groupedTeams =
    useMemo(() => {
      const grouped = {};

      teams.forEach((team) => {
        const groupName =
          team.group ||
          "No Group";

        if (
          !grouped[groupName]
        ) {
          grouped[groupName] =
            [];
        }

        grouped[groupName].push({
          ...team,

          match:
            Number(
              team.match
            ) || 0,

          win:
            Number(
              team.win
            ) || 0,

          draw:
            Number(
              team.draw
            ) || 0,

          lose:
            Number(
              team.lose
            ) || 0,

          totalGoals:
            Number(
              team.totalGoals
            ) || 0,

          points:
            Number(
              team.points
            ) || 0,
        });
      });

      Object.keys(
        grouped
      ).forEach((group) => {
        grouped[group].sort(
          (a, b) => {
            if (
              b.points !==
              a.points
            ) {
              return (
                b.points -
                a.points
              );
            }

            if (
              b.win !==
              a.win
            ) {
              return (
                b.win -
                a.win
              );
            }

            if (
              b.totalGoals !==
              a.totalGoals
            ) {
              return (
                b.totalGoals -
                a.totalGoals
              );
            }

            return 0;
          }
        );
      });

      return grouped;
    }, [teams]);

  const tabs = [
    "All Groups",
    ...Object.keys(
      groupedTeams
    ),
  ];

  if (loading) {
    return (
      <section className="min-h-screen bg-[#030B18] flex items-center justify-center">
        <h2 className="text-2xl font-bold text-white">
          Loading Point
          Table...
        </h2>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#030B18] px-4 md:px-6 py-20">
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="mb-10">
          <h2 className="text-4xl font-extrabold tracking-tight text-white uppercase md:text-5xl">
            Point Table
          </h2>

          <p className="mt-3 text-sm text-gray-400 md:text-base">
            Group Stage
            Standings
          </p>

          <div className="w-14 h-[2px] mt-5 rounded-full bg-cyan-400" />
        </div>

        {/* FILTERS */}
        <div className="flex flex-wrap gap-3 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() =>
                setActiveTab(tab)
              }
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
          {(activeTab ===
          "All Groups"
            ? Object.entries(
                groupedTeams
              )
            : [
                [
                  activeTab,
                  groupedTeams[
                    activeTab
                  ],
                ],
              ]
          ).map(
            (
              [groupName, teams],
              groupIndex
            ) => (
              <motion.div
                key={groupName}
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.4,
                  delay:
                    groupIndex *
                    0.1,
                }}
                viewport={{
                  once: true,
                }}
                className="overflow-hidden rounded-3xl border border-cyan-400/10 bg-[#071120]"
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
                    <thead className="border-b border-white/10">
                      <tr className="text-xs uppercase tracking-[2px] text-gray-500">
                        <th className="px-6 py-5 text-left">
                          #
                        </th>

                        <th className="px-6 py-5 text-left">
                          Team
                        </th>

                        <th className="px-4 py-5 text-center">
                          Match
                        </th>

                        <th className="px-4 py-5 text-center">
                          Win
                        </th>

                        <th className="px-4 py-5 text-center">
                          Draw
                        </th>

                        <th className="px-4 py-5 text-center">
                          Lose
                        </th>

                        <th className="px-4 py-5 text-center">
                          Goals
                        </th>

                        <th className="px-4 py-5 text-center">
                          PTS
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {teams?.map(
                        (
                          team,
                          index
                        ) => (
                          <tr
                            key={
                              team._id
                            }
                            className="transition-all duration-300 border-b border-white/5 hover:bg-cyan-400/5"
                          >
                            {/* POSITION */}
                            <td className="px-6 py-5">
                              <span
                                className={`w-8 h-8 flex items-center justify-center rounded-full font-bold ${
                                  index ===
                                  0
                                    ? "bg-yellow-500 text-black"
                                    : index ===
                                      1
                                    ? "bg-gray-300 text-black"
                                    : index ===
                                      2
                                    ? "bg-orange-500 text-black"
                                    : "bg-white/10 text-white"
                                }`}
                              >
                                {index +
                                  1}
                              </span>
                            </td>

                            {/* TEAM */}
                            <td className="px-6 py-5">
                              <div className="flex items-center gap-4">
                                {team.logo ? (
                                  <img
                                    src={
                                      team.logo
                                    }
                                    alt={
                                      team.name
                                    }
                                    className="object-cover border rounded-full w-11 h-11 border-white/10"
                                  />
                                ) : (
                                  <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-[11px] font-bold text-gray-300">
                                    {
                                      team.shortName
                                    }
                                  </div>
                                )}

                                <div>
                                  <h4 className="font-semibold text-white">
                                    {
                                      team.name
                                    }
                                  </h4>

                                  <p className="text-xs text-gray-400">
                                    Owner:{" "}
                                    {
                                      team.owner
                                    }
                                  </p>
                                </div>
                              </div>
                            </td>

                            <td className="px-4 py-5 text-center text-white">
                              {
                                team.match
                              }
                            </td>

                            <td className="px-4 py-5 font-bold text-center text-green-400">
                              {
                                team.win
                              }
                            </td>

                            <td className="px-4 py-5 font-bold text-center text-yellow-400">
                              {
                                team.draw
                              }
                            </td>

                            <td className="px-4 py-5 font-bold text-center text-red-400">
                              {
                                team.lose
                              }
                            </td>

                            <td className="px-4 py-5 text-center text-white">
                              {
                                team.totalGoals
                              }
                            </td>

                            <td className="px-4 py-5 font-extrabold text-center text-cyan-300">
                              {
                                team.points
                              }
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default PointTables;