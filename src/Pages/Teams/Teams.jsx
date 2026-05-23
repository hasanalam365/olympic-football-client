// Teams.jsx

import React, {
  useState,
} from "react";

import {
  MapPin,
  Shield,
  Users,
  Trophy,
  X,
  Phone,
  User,
} from "lucide-react";

import { motion } from "framer-motion";

import { useQuery } from "@tanstack/react-query";

import useAxiosPublic from "../../Hooks/useAxiosPublic";

const Teams = () => {
  const axiosPublic =
    useAxiosPublic();

  /* =========================================
     MODAL STATE
  ========================================= */
  const [
    selectedTeam,
    setSelectedTeam,
  ] = useState(null);

  /* =========================================
     GET ALL TEAMS
  ========================================= */
  const {
    data: teams = [],
    isLoading,
  } = useQuery({
    queryKey: ["teams"],

    queryFn: async () => {
      const res =
        await axiosPublic.get(
          "/teams"
        );

      return res.data;
    },
  });

  /* =========================================
     LOADING
  ========================================= */
  if (isLoading) {
    return (
      <section className="min-h-screen bg-[#030B18] px-6 py-20">
        <div className="mx-auto max-w-7xl">

          {/* HEADER */}
          <div className="mb-12">
            <h2 className="text-4xl font-extrabold tracking-tight text-white uppercase md:text-5xl">
              Teams
            </h2>

            <p className="mt-3 text-sm text-gray-400 md:text-base">
              Loading teams...
            </p>

            <div className="w-14 h-[2px] mt-5 rounded-full bg-cyan-400" />
          </div>

          {/* SKELETON */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {[...Array(6)].map(
              (_, index) => (
                <div
                  key={index}
                  className="overflow-hidden border rounded-3xl border-cyan-400/10 bg-[#071120] animate-pulse"
                >
                  <div className="h-28 bg-[#111827]" />

                  <div className="px-6 pt-10 pb-6">
                    <div className="w-40 h-6 rounded bg-white/10" />

                    <div className="w-32 h-4 mt-4 rounded bg-white/10" />

                    <div className="h-px my-5 bg-white/10" />

                    <div className="flex items-center justify-between">
                      <div className="w-24 h-4 rounded bg-white/10" />

                      <div className="h-4 rounded w-14 bg-white/10" />
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#030B18] px-6 py-20">

      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <div className="mb-12">

          <h2 className="text-4xl font-extrabold tracking-tight text-white uppercase md:text-5xl">
            Teams
          </h2>

          <p className="mt-3 text-sm text-gray-400 md:text-base">
            All participating teams
          </p>

          <div className="w-14 h-[2px] mt-5 rounded-full bg-cyan-400" />
        </div>

        {/* EMPTY STATE */}
        {teams.length === 0 && (
          <div className="py-24 text-center border border-dashed rounded-3xl border-white/10 bg-[#071120]">

            <Shield
              size={45}
              className="mx-auto text-cyan-400"
            />

            <h3 className="mt-5 text-2xl font-bold text-white">
              No Teams Found
            </h3>

            <p className="mt-2 text-gray-400">
              No team data available
              right now.
            </p>
          </div>
        )}

        {/* GRID */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">

          {teams.map(
            (team, index) => (
              <motion.div
                key={team._id}
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
                    index * 0.08,
                }}
                viewport={{
                  once: true,
                }}
                onClick={() =>
                  setSelectedTeam(
                    team
                  )
                }
                className="group relative cursor-pointer overflow-hidden rounded-3xl border border-cyan-400/10 bg-[#071120] transition-all duration-500 hover:-translate-y-1 hover:border-cyan-400/30 hover:shadow-[0_0_45px_rgba(34,211,238,0.14)]"
              >

                {/* TOP */}
                <div className="relative h-28 overflow-hidden bg-gradient-to-br from-[#111C33] via-[#111827] to-[#1A2440]">

                  {/* GLOW */}
                  <div className="absolute top-0 right-0 w-40 h-40 transition-all duration-500 rounded-full opacity-0 blur-3xl bg-cyan-400/10 group-hover:opacity-100" />
                </div>

                {/* LOGO */}
                <div className="absolute top-[80px] left-1/2 flex h-16 w-16 -translate-x-1/2 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[#111827] shadow-xl backdrop-blur-xl">

                  {team?.logo ? (
                    <img
                      src={
                        team.logo
                      }
                      alt={
                        team.name
                      }
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <Shield
                      size={24}
                      className="text-cyan-300"
                    />
                  )}
                </div>

                {/* CONTENT */}
                <div className="px-6 pt-12 pb-6 text-center">

                  {/* TEAM NAME */}
                  <h3 className="text-xl font-extrabold text-white transition-all duration-300 group-hover:text-cyan-300">
                    {team?.name}
                  </h3>

                  {/* SHORT NAME */}
                  <p className="mt-1 text-sm font-medium text-cyan-400">
                    {
                      team?.shortName
                    }
                  </p>

                  {/* OWNER */}
                  <p className="mt-3 text-sm text-gray-400">
                    Owner:{" "}
                    {team?.owner ||
                      "Unknown"}
                  </p>

                  {/* DIVIDER */}
                  <div className="h-px my-5 bg-white/10" />

                  {/* STATS */}
                  <div className="grid grid-cols-3 gap-3">

                    <div className="p-3 text-center border rounded-2xl border-white/5 bg-white/5">

                      <Users
                        size={18}
                        className="mx-auto mb-2 text-cyan-400"
                      />

                      <h4 className="text-lg font-bold text-white">
                        {team?.players
                          ?.length ||
                          0}
                      </h4>

                      <p className="text-xs text-gray-400">
                        Players
                      </p>
                    </div>

                    <div className="p-3 text-center border rounded-2xl border-white/5 bg-white/5">

                      <Trophy
                        size={18}
                        className="mx-auto mb-2 text-yellow-400"
                      />

                      <h4 className="text-lg font-bold text-white">
                        {team?.points ||
                          0}
                      </h4>

                      <p className="text-xs text-gray-400">
                        Points
                      </p>
                    </div>

                    <div className="p-3 text-center border rounded-2xl border-white/5 bg-white/5">

                      <Shield
                        size={18}
                        className="mx-auto mb-2 text-green-400"
                      />

                      <h4 className="text-lg font-bold text-white">
                        {team?.win ||
                          0}
                      </h4>

                      <p className="text-xs text-gray-400">
                        Wins
                      </p>
                    </div>
                  </div>

                  {/* DIVIDER */}
                  <div className="h-px my-5 bg-white/10" />

                  {/* FOOTER */}
                  <div className="flex items-center justify-between text-sm">

                    <span className="text-gray-400">
                      {team?.group ||
                        "No Group"}
                    </span>

                    <span className="font-semibold text-cyan-300">
                      Match{" "}
                      {team?.match ||
                        0}
                    </span>
                  </div>
                </div>
              </motion.div>
            )
          )}
        </div>
      </div>

      {/* =========================================
          MODAL
      ========================================= */}
      {selectedTeam && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
              y: 30,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
            }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-cyan-500 scrollbar-track-transparent border shadow-2xl rounded-3xl border-cyan-400/20 bg-[#071120]"
          >

            {/* CLOSE BUTTON */}
            <button
              onClick={() =>
                setSelectedTeam(
                  null
                )
              }
              className="sticky top-5 left-[94%] z-50 flex items-center justify-center w-10 h-10 text-white transition-all duration-300 rounded-full bg-white/10 hover:bg-red-500"
            >
              <X size={20} />
            </button>

            {/* TOP */}
            <div className="relative h-48 bg-gradient-to-br from-[#111C33] via-[#111827] to-[#1A2440]">

              {/* BANNER */}
              {selectedTeam?.banner && (
                <img
                  src={
                    selectedTeam.banner
                  }
                  alt=""
                  className="object-cover w-full h-full opacity-40"
                />
              )}

              {/* LOGO */}
              <div className="absolute bottom-[-40px] left-10 flex items-center justify-center w-24 h-24 overflow-hidden border-4 rounded-3xl border-[#071120] bg-[#111827]">

                {selectedTeam?.logo ? (
                  <img
                    src={
                      selectedTeam.logo
                    }
                    alt={
                      selectedTeam.name
                    }
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <Shield
                    size={34}
                    className="text-cyan-300"
                  />
                )}
              </div>
            </div>

            {/* CONTENT */}
            <div className="px-6 pb-8 pt-14 md:px-10">

              {/* NAME */}
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

                <div>
                  <h2 className="text-3xl font-extrabold text-white">
                    {
                      selectedTeam?.name
                    }
                  </h2>

                  <p className="mt-1 text-cyan-400">
                    {
                      selectedTeam?.shortName
                    }
                  </p>
                </div>

                <div className="px-4 py-2 text-sm font-semibold border rounded-full text-cyan-300 border-cyan-400/20 bg-cyan-400/10">
                  {selectedTeam?.group}
                </div>
              </div>

              {/* INFO */}
              <div className="grid grid-cols-1 gap-4 mt-8 md:grid-cols-3">

                <div className="p-5 border rounded-2xl border-white/10 bg-white/5">

                  <User className="mb-3 text-cyan-400" />

                  <p className="text-sm text-gray-400">
                    Owner
                  </p>

                  <h4 className="mt-1 text-lg font-bold text-white">
                    {
                      selectedTeam?.owner
                    }
                  </h4>
                </div>

                <div className="p-5 border rounded-2xl border-white/10 bg-white/5">

                  <Phone className="mb-3 text-cyan-400" />

                  <p className="text-sm text-gray-400">
                    Phone
                  </p>

                  <h4 className="mt-1 text-lg font-bold text-white">
                    {selectedTeam?.ownerPhone ||
                      "N/A"}
                  </h4>
                </div>

                <div className="p-5 border rounded-2xl border-white/10 bg-white/5">

                  <MapPin className="mb-3 text-cyan-400" />

                  <p className="text-sm text-gray-400">
                    Location
                  </p>

                  <h4 className="mt-1 text-lg font-bold text-white">
                    সর্দারবাড়ী,
                    মেলান্দহ
                  </h4>
                </div>
              </div>

              {/* STATS */}
              <div className="grid grid-cols-2 gap-4 mt-8 md:grid-cols-5">

                <div className="p-4 text-center border rounded-2xl border-white/10 bg-white/5">
                  <h3 className="text-2xl font-bold text-cyan-300">
                    {selectedTeam?.match ||
                      0}
                  </h3>

                  <p className="mt-1 text-sm text-gray-400">
                    Matches
                  </p>
                </div>

                <div className="p-4 text-center border rounded-2xl border-white/10 bg-white/5">
                  <h3 className="text-2xl font-bold text-green-400">
                    {selectedTeam?.win ||
                      0}
                  </h3>

                  <p className="mt-1 text-sm text-gray-400">
                    Wins
                  </p>
                </div>

                <div className="p-4 text-center border rounded-2xl border-white/10 bg-white/5">
                  <h3 className="text-2xl font-bold text-yellow-400">
                    {selectedTeam?.draw ||
                      0}
                  </h3>

                  <p className="mt-1 text-sm text-gray-400">
                    Draws
                  </p>
                </div>

                <div className="p-4 text-center border rounded-2xl border-white/10 bg-white/5">
                  <h3 className="text-2xl font-bold text-red-400">
                    {selectedTeam?.lose ||
                      0}
                  </h3>

                  <p className="mt-1 text-sm text-gray-400">
                    Losses
                  </p>
                </div>

                <div className="p-4 text-center border rounded-2xl border-white/10 bg-white/5">
                  <h3 className="text-2xl font-bold text-cyan-300">
                    {selectedTeam?.points ||
                      0}
                  </h3>

                  <p className="mt-1 text-sm text-gray-400">
                    Points
                  </p>
                </div>
              </div>

              {/* PLAYERS */}
              <div className="mt-10">

                <div className="flex items-center justify-between mb-5">

                  <h3 className="text-2xl font-bold text-white">
                    Players
                  </h3>

                  <div className="px-4 py-2 text-sm font-semibold rounded-full text-cyan-300 bg-cyan-400/10">
                    {
                      selectedTeam
                        ?.players
                        ?.length
                    }{" "}
                    Players
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                  {selectedTeam?.players?.map(
                    (player) => (
                      <div
                        key={
                          player._id
                        }
                        className="flex items-center gap-4 p-4 border rounded-2xl border-white/10 bg-white/5"
                      >

                        <img
                          src={
                            player.photo
                          }
                          alt={
                            player.name
                          }
                          className="object-cover border w-14 h-14 rounded-xl border-white/10"
                        />

                        <div>
                          <h4 className="font-bold text-white">
                            {
                              player.name
                            }
                          </h4>

                          <p className="text-sm text-gray-400">
                            {
                              player.phoneNumber
                            }
                          </p>
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
    </section>
  );
};

export default Teams;