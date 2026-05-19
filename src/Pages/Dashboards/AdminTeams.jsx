import React, {
  useEffect,
  useState,
} from "react";

import {
  Plus,
  Pencil,
  Trash2,
  Search,
  Users,
  Shield,
  Trophy,
} from "lucide-react";

import { Link } from "react-router-dom";

import { motion } from "framer-motion";

import useAxiosPublic from "../../Hooks/useAxiosPublic";

const AdminTeams = () => {
  const [teams, setTeams] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const axiosPublic =
    useAxiosPublic();

  /* ======================================
      GET ALL TEAMS
  ====================================== */
  useEffect(() => {
    const getTeams =
      async () => {
        try {
          const res =
            await axiosPublic.get(
              "/teams"
            );

          setTeams(
            res.data
          );

          setLoading(false);
        } catch (error) {
          console.log(error);

          setLoading(false);
        }
      };

    getTeams();
  }, [axiosPublic]);

  /* ======================================
      DELETE TEAM
  ====================================== */
  const handleDelete =
    async (id) => {
      const confirmDelete =
        window.confirm(
          "Delete this team?"
        );

      if (!confirmDelete)
        return;

      try {
        const res =
          await axiosPublic.delete(
            `/teams/${id}`
          );

        if (
          res.data.deletedCount >
          0
        ) {
          setTeams(
            teams.filter(
              (team) =>
                team._id !== id
            )
          );
        }
      } catch (error) {
        console.log(error);
      }
    };

  /* ======================================
      SEARCH FILTER
  ====================================== */
  const filteredTeams =
    teams.filter((team) =>
      team.name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  return (
    <section className="min-h-screen bg-[#030B18] text-white p-4 md:p-6">
      {/* HEADER */}
      <div className="flex flex-col gap-6 mb-8 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 border rounded-full bg-cyan-400/10 border-cyan-400/20">
            <Shield
              size={16}
              className="text-cyan-300"
            />

            <span className="text-sm text-cyan-200">
              Tournament Admin
            </span>
          </div>

          <h2 className="text-3xl font-black md:text-4xl">
            Team Management
          </h2>

          <p className="mt-3 text-sm text-gray-400 md:text-base">
            Manage all football
            tournament teams
          </p>
        </div>

        <Link
          to="/dashboard/addTeam"
          className="flex items-center justify-center w-full gap-3 px-6 font-bold text-black transition-all duration-300 md:w-fit h-14 rounded-2xl bg-cyan-300 hover:scale-[1.03]"
        >
          <Plus size={18} />
          Add New Team
        </Link>
      </div>

      {/* TOP STATS */}
      <div className="grid grid-cols-1 gap-4 mb-8 sm:grid-cols-2 xl:grid-cols-3">
        <div className="p-6 border rounded-3xl border-white/10 bg-[#071120]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400">
                Total Teams
              </p>

              <h2 className="mt-2 text-3xl font-black">
                {teams.length}
              </h2>
            </div>

            <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-cyan-400/10">
              <Users className="text-cyan-300" />
            </div>
          </div>
        </div>

        <div className="p-6 border rounded-3xl border-white/10 bg-[#071120]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400">
                Total Players
              </p>

              <h2 className="mt-2 text-3xl font-black">
                {teams.reduce(
                  (
                    total,
                    team
                  ) =>
                    total +
                    (
                      team.players
                        ?.length || 0
                    ),
                  0
                )}
              </h2>
            </div>

            <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-cyan-400/10">
              <Shield className="text-cyan-300" />
            </div>
          </div>
        </div>

        <div className="p-6 border rounded-3xl border-white/10 bg-[#071120] sm:col-span-2 xl:col-span-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400">
                Active Groups
              </p>

              <h2 className="mt-2 text-3xl font-black">
                {
                  [
                    ...new Set(
                      teams.map(
                        (
                          team
                        ) =>
                          team.group
                      )
                    ),
                  ].length
                }
              </h2>
            </div>

            <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-cyan-400/10">
              <Trophy className="text-cyan-300" />
            </div>
          </div>
        </div>
      </div>

      {/* SEARCH */}
      <div className="relative mb-8">
        <Search className="absolute text-gray-500 -translate-y-1/2 left-5 top-1/2" />

        <input
          type="text"
          placeholder="Search team..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          className="w-full h-14 rounded-2xl border border-white/10 bg-[#071120] px-14 outline-none focus:border-cyan-400/40"
        />
      </div>

      {/* =========================
          MOBILE CARD VIEW
      ========================== */}
      <div className="grid grid-cols-1 gap-5 lg:hidden">
        {filteredTeams.map(
          (team, index) => (
            <motion.div
              key={team._id}
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay:
                  index * 0.05,
              }}
              className="p-5 border rounded-3xl border-white/10 bg-[#071120]"
            >
              {/* TOP */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 overflow-hidden border rounded-2xl border-white/10 bg-white/5">
                  <img
                    src={
                      team.logo ||
                      "https://i.ibb.co/jvY69xhW/player-icon.png"
                    }
                    alt={
                      team.name
                    }
                    className="object-cover w-full h-full"
                  />
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-bold">
                    {
                      team.name
                    }
                  </h3>

                  <p className="text-sm text-gray-400">
                    {
                      team.shortName
                    }
                  </p>
                </div>
              </div>

              {/* INFO */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div>
                  <p className="text-sm text-gray-500">
                    Owner
                  </p>

                  <h4 className="mt-1 font-semibold">
                    {
                      team.owner
                    }
                  </h4>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Group
                  </p>

                  <span className="inline-block px-3 py-1 mt-1 text-sm rounded-full bg-cyan-400/10 text-cyan-300">
                    {
                      team.group
                    }
                  </span>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Players
                  </p>

                  <h4 className="mt-1 font-bold">
                    {
                      team.players
                        ?.length
                    }
                  </h4>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Points
                  </p>

                  <h4 className="mt-1 font-bold text-cyan-300">
                    {team.points ||
                      0}
                  </h4>
                </div>
              </div>

              {/* ACTIONS */}
              <div className="flex items-center gap-3 mt-6">
                <Link
                  to={`/dashboard/editTeam/${team._id}`}
                  className="flex items-center justify-center flex-1 gap-2 font-semibold transition-all duration-300 border h-12 rounded-2xl border-white/10 bg-[#0B1627] hover:border-cyan-400/30 hover:text-cyan-300"
                >
                  <Pencil
                    size={18}
                  />

                  Edit
                </Link>

                <button
                  onClick={() =>
                    handleDelete(
                      team._id
                    )
                  }
                  className="flex items-center justify-center flex-1 gap-2 font-semibold transition-all duration-300 border h-12 rounded-2xl border-white/10 bg-[#0B1627] hover:border-red-500/30 hover:text-red-400"
                >
                  <Trash2
                    size={18}
                  />

                  Delete
                </button>
              </div>
            </motion.div>
          )
        )}
      </div>

      {/* =========================
          DESKTOP TABLE
      ========================== */}
      <div className="hidden overflow-hidden border lg:block border-white/10 rounded-3xl bg-[#071120]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead className="bg-cyan-400/5">
              <tr className="text-left border-b border-white/10">
                <th className="px-6 py-5">
                  Team
                </th>

                <th className="px-6 py-5">
                  Owner
                </th>

                <th className="px-6 py-5">
                  Group
                </th>

                <th className="px-6 py-5">
                  Players
                </th>

                <th className="px-6 py-5">
                  Points
                </th>

                <th className="px-6 py-5">
                  Created
                </th>

                <th className="px-6 py-5 text-right">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredTeams.map(
                (
                  team,
                  index
                ) => (
                  <motion.tr
                    key={team._id}
                    initial={{
                      opacity: 0,
                      y: 20,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay:
                        index *
                        0.05,
                    }}
                    className="border-b border-white/5 hover:bg-cyan-400/5"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="overflow-hidden border rounded-2xl w-14 h-14 border-white/10 bg-white/5">
                          <img
                            src={
                              team.logo ||
                              "https://i.ibb.co/jvY69xhW/player-icon.png"
                            }
                            alt={
                              team.name
                            }
                            className="object-cover w-full h-full"
                          />
                        </div>

                        <div>
                          <h3 className="text-lg font-bold">
                            {
                              team.name
                            }
                          </h3>

                          <p className="text-sm text-gray-500">
                            {
                              team.shortName
                            }
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <div>
                        <p className="font-medium">
                          {
                            team.owner
                          }
                        </p>

                        <p className="text-sm text-gray-500">
                          {
                            team.ownerPhone
                          }
                        </p>
                      </div>
                    </td>

                    <td className="">
                      <span className="px-4 py-2 text-sm rounded-full bg-cyan-400/10 text-cyan-300">
                        {
                          team.group
                        }
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      {
                        team.players
                          ?.length
                      }
                    </td>

                    <td className="px-6 py-5">
                      <span className="font-bold text-cyan-300">
                        {team.points ||
                          0}
                      </span>
                    </td>

                    <td className="px-6 py-5 text-gray-400">
                      {new Date(
                        team.createdAt
                      ).toLocaleDateString()}
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex items-center justify-end gap-3">
                        <Link
                          to={`/dashboard/editTeam/${team._id}`}
                          className="flex items-center justify-center transition-all duration-300 border w-11 h-11 rounded-xl border-white/10 bg-[#0B1627] hover:border-cyan-400/30 hover:text-cyan-300"
                        >
                          <Pencil
                            size={
                              18
                            }
                          />
                        </Link>

                        <button
                          onClick={() =>
                            handleDelete(
                              team._id
                            )
                          }
                          className="flex items-center justify-center transition-all duration-300 border w-11 h-11 rounded-xl border-white/10 bg-[#0B1627] hover:border-red-500/30 hover:text-red-400"
                        >
                          <Trash2
                            size={
                              18
                            }
                          />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* EMPTY */}
      {!loading &&
        filteredTeams.length ===
          0 && (
          <div className="py-24 text-center">
            <h2 className="text-3xl font-black">
              No Teams Found
            </h2>

            <p className="mt-3 text-gray-400">
              Try another search
            </p>
          </div>
        )}
    </section>
  );
};

export default AdminTeams;