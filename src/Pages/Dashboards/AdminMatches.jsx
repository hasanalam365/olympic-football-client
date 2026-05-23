// AdminMatches.jsx

import React from "react";

import {
  Plus,
  Pencil,
  Trash2,
  Radio,
  CalendarDays,
  Clock3,
  Shield,
} from "lucide-react";

import { motion } from "framer-motion";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import useAxiosPublic from "../../Hooks/useAxiosPublic";

import { toast } from "react-toastify";

const AdminMatches = () => {
  const axiosPublic =
    useAxiosPublic();

  const navigate =
    useNavigate();

  const queryClient =
    useQueryClient();

  /* =========================================
     GET ALL MATCHES
  ========================================= */
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

  /* =========================================
     DELETE MATCH
  ========================================= */
  const deleteMutation =
    useMutation({
      mutationFn: async (id) => {
        const res =
          await axiosPublic.delete(
            `/matches/${id}`
          );

        return res.data;
      },

      onSuccess: () => {
        toast.success(
          "Match deleted successfully"
        );

        queryClient.invalidateQueries(
          ["matches"]
        );
      },

      onError: () => {
        toast.error(
          "Failed to delete match"
        );
      },
    });

  /* =========================================
     HANDLE DELETE
  ========================================= */
  const handleDelete = (id) => {
    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this match?"
      );

    if (confirmDelete) {
      deleteMutation.mutate(id);
    }
  };

  /* =========================================
     LOADING
  ========================================= */
  if (isLoading) {
    return (
      <section className="min-h-screen bg-[#030B18] text-white">
        <div className="space-y-5">
          {[...Array(5)].map(
            (_, index) => (
              <div
                key={index}
                className="overflow-hidden border rounded-2xl border-cyan-400/10 bg-[#071120] px-6 py-5 animate-pulse"
              >
                <div className="w-24 h-5 rounded bg-white/10" />

                <div className="w-64 h-6 mt-5 rounded bg-white/10" />
              </div>
            )
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#030B18] text-white">

      {/* HEADER */}
      <div className="flex flex-col gap-5 mb-10 md:flex-row md:items-center md:justify-between">

        <div>
          <h2 className="text-4xl font-extrabold tracking-tight text-white">
            Matches
          </h2>

          <p className="mt-2 text-gray-400">
            Manage fixtures and
            live scores
          </p>
        </div>

        {/* ADD BUTTON */}
        <Link to="/dashboard/addMatch">

          <button className="flex items-center justify-center gap-3 px-6 text-sm font-bold text-black transition-all duration-300 h-14 rounded-2xl bg-cyan-300 hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(103,232,249,0.35)]">

            <Plus size={18} />

            Add Match
          </button>
        </Link>
      </div>

      {/* EMPTY */}
      {matches.length === 0 && (
        <div className="py-24 text-center border border-dashed rounded-3xl border-white/10 bg-[#071120]">

          <Shield
            size={45}
            className="mx-auto text-cyan-400"
          />

          <h3 className="mt-5 text-2xl font-bold text-white">
            No Matches Found
          </h3>

          <p className="mt-2 text-gray-400">
            No fixtures available
            right now.
          </p>
        </div>
      )}

      {/* MATCHES */}
      <div className="space-y-5">

        {matches.map(
          (match, index) => (
            <motion.div
              key={match._id}
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
                  index * 0.06,
              }}
              viewport={{
                once: true,
              }}
              className="group relative overflow-hidden rounded-2xl border border-cyan-400/10 bg-[#071120] px-6 py-5 transition-all duration-500 hover:border-cyan-400/30 hover:shadow-[0_0_35px_rgba(34,211,238,0.10)]"
            >

              {/* GLOW */}
              <div className="absolute top-0 right-0 w-40 h-40 transition-all duration-500 rounded-full opacity-0 blur-3xl bg-cyan-400/10 group-hover:opacity-100" />

              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                {/* LEFT */}
                <div>

                  {/* STATUS */}
                  <div className="flex flex-wrap items-center gap-3 mb-4">

                    {match.status ===
                      "live" && (
                      <Radio
                        size={13}
                        className="text-red-500 animate-pulse"
                      />
                    )}

                    <span
                      className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide ${
                        match.status ===
                        "live"
                          ? "bg-red-500/15 text-red-400"
                          : match.status ===
                            "scheduled"
                          ? "bg-cyan-400/10 text-cyan-300"
                          : "bg-white/10 text-gray-400"
                      }`}
                    >
                      {
                        match.status
                      }
                    </span>

                    <span className="px-3 py-1 text-xs font-semibold tracking-wide rounded-full bg-cyan-400/10 text-cyan-300">
                      {match.group}
                    </span>
                  </div>

                  {/* MATCH */}
                  <h3 className="text-lg font-bold text-white md:text-2xl">

                    {
                      match.homeTeam
                    }

                    <span className="mx-3 text-cyan-300">
                      {match.homeScore ??
                        0}

                      -

                      {match.awayScore ??
                        0}
                    </span>

                    {
                      match.awayTeam
                    }
                  </h3>

                  {/* DATE TIME */}
                  <div className="flex flex-wrap items-center gap-5 mt-5 text-sm text-gray-400">

                    <div className="flex items-center gap-2">

                      <CalendarDays
                        size={16}
                        className="text-cyan-400"
                      />

                      {match.date}
                    </div>

                    <div className="flex items-center gap-2">

                      <Clock3
                        size={16}
                        className="text-cyan-400"
                      />

                      {match.time}
                    </div>
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="flex items-center gap-3">

                  {/* EDIT */}
                  <button
                    onClick={() =>
                      navigate(
                        `/dashboard/editMatch/${match._id}`
                      )
                    }
                    className="flex items-center justify-center w-11 h-11 rounded-xl border border-white/10 bg-[#0B1627] transition-all duration-300 hover:border-cyan-400/30 hover:text-cyan-300"
                  >

                    <Pencil size={17} />
                  </button>

                  {/* DELETE */}
                  <button
                    onClick={() =>
                      handleDelete(
                        match._id
                      )
                    }
                    className="flex items-center justify-center w-11 h-11 rounded-xl border border-white/10 bg-[#0B1627] transition-all duration-300 hover:border-red-500/30 hover:text-red-400"
                  >

                    <Trash2 size={17} />
                  </button>
                </div>
              </div>
            </motion.div>
          )
        )}
      </div>
    </section>
  );
};

export default AdminMatches;