// AdminPlayers.jsx

import React, {
  useEffect,
  useState,
} from "react";

import {
  Plus,
  Pencil,
  Trash2,
  Search,
} from "lucide-react";

import { motion } from "framer-motion";

import { Link } from "react-router-dom";

import useAxiosPublic from "../../Hooks/useAxiosPublic";

import { toast } from "react-toastify";

const AdminPlayers = () => {
  const [players, setPlayers] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const axiosPublic =
    useAxiosPublic();

  /* ======================================
      GET PLAYERS
  ====================================== */
  useEffect(() => {
    const getPlayers =
      async () => {
        try {
          const res =
            await axiosPublic.get(
              "/players"
            );

          setPlayers(
            res.data
          );

          setLoading(false);
        } catch (error) {
          console.log(error);

          setLoading(false);
        }
      };

    getPlayers();
  }, [axiosPublic]);

  /* ======================================
      DELETE PLAYER
  ====================================== */
  const handleDelete =
    async (id) => {
      const confirmDelete =
        window.confirm(
          "Delete this player?"
        );

      if (!confirmDelete)
        return;

      try {
        const res =
          await axiosPublic.delete(
            `/players/${id}`
          );

        if (
          res.data.deletedCount >
          0
        ) {
          toast.success(
            "Player deleted successfully"
          );

          setPlayers(
            players.filter(
              (player) =>
                player._id !== id
            )
          );
        }
      } catch (error) {
        console.log(error);
      }
    };

  /* ======================================
      SEARCH
  ====================================== */
  const filteredPlayers =
    players.filter((player) =>
      player.name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  return (
    <section className="min-h-screen bg-[#030B18] text-white p-4 md:p-6">
      {/* HEADER */}
      <div className="flex flex-col gap-5 mb-8 md:mb-10 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
            Players
          </h2>

          <p className="mt-2 text-sm text-gray-400 md:text-base">
            Manage players and stats
          </p>
        </div>

        <Link
          to="/dashboard/addPlayer"
          className="flex items-center justify-center gap-3 px-6 text-sm font-bold text-black transition-all duration-300 h-14 rounded-2xl bg-cyan-300 hover:scale-[1.03]"
        >
          <Plus size={18} />

          Add Player
        </Link>
      </div>

      {/* SEARCH */}
      <div className="relative mb-8">
        <Search className="absolute text-gray-500 -translate-y-1/2 left-5 top-1/2" />

        <input
          type="text"
          placeholder="Search player..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          className="w-full h-14 rounded-2xl border border-white/10 bg-[#071120] px-14 outline-none focus:border-cyan-400/40"
        />
      </div>

      {/* PLAYERS */}
      <div className="space-y-5">
        {filteredPlayers.map(
          (
            player,
            index
          ) => (
            <motion.div
              key={player._id}
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.45,
                delay:
                  index * 0.05,
              }}
              viewport={{
                once: true,
              }}
              className="group relative overflow-hidden rounded-3xl border border-cyan-400/10 bg-[#071120] p-4 md:p-6"
            >
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                {/* LEFT */}
                <div className="flex items-start gap-4 md:items-center">
                  <div className="w-16 h-16 overflow-hidden border rounded-2xl border-white/10 bg-white/5 shrink-0">
                    <img
                      src={
                        player.photo
                      }
                      alt=""
                      className="object-cover w-full h-full"
                    />
                  </div>

                  <div>
                    <h3 className="text-lg font-bold transition-all duration-300 group-hover:text-cyan-300">
                      {
                        player.name
                      }
                    </h3>

                    <div className="mt-1 space-y-1 text-sm text-gray-400">
                      <p>
                        Age:{" "}
                        {
                          player.age
                        }
                      </p>

                      <p>
                        Phone:{" "}
                        {
                          player.phoneNumber
                        }
                      </p>

                      <p>
                        Blood:{" "}
                        {player.bloodGroup ||
                          "N/A"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* RIGHT */}
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between lg:justify-end">
                  {/* STATS */}
                  <div className="grid grid-cols-2 gap-3 sm:flex sm:items-center sm:gap-5">
                    <div className="px-4 py-3 text-center rounded-2xl bg-[#0B1627]">
                      <p className="text-xs text-gray-500">
                        Goals
                      </p>

                      <h4 className="mt-1 font-bold text-cyan-300">
                        {
                          player.totalGoals
                        }
                      </h4>
                    </div>

                    <div className="px-4 py-3 text-center rounded-2xl bg-[#0B1627]">
                      <p className="text-xs text-gray-500">
                        Matches
                      </p>

                      <h4 className="mt-1 font-bold text-cyan-300">
                        {
                          player.match
                        }
                      </h4>
                    </div>
                  </div>

                  {/* ACTIONS */}
                  <div className="flex items-center gap-3">
                    <Link
                      to={`/dashboard/editPlayer/${player._id}`}
                      className="flex items-center justify-center w-11 h-11 rounded-xl border border-white/10 bg-[#0B1627] transition-all duration-300 hover:border-cyan-400/30 hover:text-cyan-300"
                    >
                      <Pencil
                        size={17}
                      />
                    </Link>

                    <button
                      onClick={() =>
                        handleDelete(
                          player._id
                        )
                      }
                      className="flex items-center justify-center w-11 h-11 rounded-xl border border-white/10 bg-[#0B1627] transition-all duration-300 hover:border-red-500/30 hover:text-red-400"
                    >
                      <Trash2
                        size={17}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        )}
      </div>

      {/* EMPTY */}
      {!loading &&
        filteredPlayers.length ===
          0 && (
          <div className="py-24 text-center">
            <h2 className="text-3xl font-black">
              No Players Found
            </h2>

            <p className="mt-3 text-gray-400">
              Try another search
            </p>
          </div>
        )}
    </section>
  );
};

export default AdminPlayers;