// AddMatch.jsx

import React, {
  useState,
} from "react";

import {
  ArrowLeft,
  Save,
  CalendarDays,
  Clock3,
  Shield,
  Trophy,
} from "lucide-react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import { motion } from "framer-motion";

import { useMutation } from "@tanstack/react-query";

import { toast } from "react-toastify";

import useAxiosPublic from "../Hooks/useAxiosPublic";

const demoTeams = [
  "ইসমাইল একাদশ",
  "সর্দারবাড়ী প্রবাসী একাদশ",
  "কুটুম বাড়ী একাদশ",
  "আরাফ ফুটবল একাদশ",
  "বিদ্রোহী একাদশ",
  "মারুফ একাদশ",
  "হাবিজুর একাদশ",
  "মিষ্টার একাদশ",
];

const AddMatch = () => {
  const navigate =
    useNavigate();

  const axiosPublic =
    useAxiosPublic();

  const [formData, setFormData] =
    useState({
      homeTeam:
        "ইসমাইল একাদশ",

      awayTeam:
        "সর্দারবাড়ী প্রবাসী একাদশ",

      group: "Group A",

      date: "",

      time: "",
    });

  /* =========================================
     HANDLE CHANGE
  ========================================= */
  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  /* =========================================
     ADD MATCH MUTATION
  ========================================= */
  const {
    mutateAsync,
    isPending,
  } = useMutation({
    mutationFn: async (
      matchData
    ) => {
      const res =
        await axiosPublic.post(
          "/matches",
          matchData
        );

      return res.data;
    },
  });

  /* =========================================
     HANDLE SUBMIT
  ========================================= */
  const handleSubmit =
    async (e) => {
      e.preventDefault();

      if (
        formData.homeTeam ===
        formData.awayTeam
      ) {
        return toast.error(
          "দুটো একই দল সিলেক্ট করেছেন!"
        );
      }

      const matchData = {
        ...formData,

        homeScore: 0,

        awayScore: 0,
        

        status:
          "scheduled",
          isResult: false,
          isLive: false
      };

      try {
        const result =
          await mutateAsync(
            matchData
          );

        if (
          result.insertedId
        ) {
          toast.success(
            "Match Added Successfully"
          );

          navigate(
            "/dashboard/matches"
          );
        }
      } catch (error) {
        console.log(error);

        toast.error(
          "Failed to add match"
        );
      }
    };

  return (
    <section className="min-h-screen bg-[#030B18] px-4 py-8 text-white md:px-8">

      <div className="max-w-4xl mx-auto">

        {/* TOP */}
        <div className="flex flex-col gap-5 mb-10 md:flex-row md:items-center md:justify-between">

          <div>

            <h2 className="text-4xl font-extrabold tracking-tight">
              Add Match
            </h2>

            <p className="mt-2 text-gray-400">
              Create new fixture
            </p>
          </div>

          <Link
            to="/dashboard/matches"
            className="flex items-center justify-center gap-2 px-5 text-sm font-semibold transition-all duration-300 border h-12 rounded-2xl border-white/10 bg-[#071120] hover:border-cyan-400/30 hover:text-cyan-300"
          >
            <ArrowLeft size={18} />

            Back
          </Link>
        </div>

        {/* FORM */}
        <motion.form
          onSubmit={
            handleSubmit
          }
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.45,
          }}
          className="overflow-hidden border shadow-2xl rounded-3xl border-cyan-400/10 bg-[#071120]"
        >

          {/* HEADER */}
          <div className="px-8 py-8 border-b border-white/10 bg-gradient-to-r from-[#0B1627] to-[#111C33]">

            <div className="flex items-center gap-4">

              <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-cyan-400/10">

                <Trophy className="text-cyan-300" />
              </div>

              <div>
                <h3 className="text-2xl font-bold">
                  Match Information
                </h3>

                <p className="mt-1 text-sm text-gray-400">
                  Fill all required
                  fields
                </p>
              </div>
            </div>
          </div>

          {/* BODY */}
          <div className="p-8 space-y-8">

            {/* TEAMS */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

              {/* HOME */}
              <div>

                <label className="flex items-center gap-2 mb-3 text-sm font-semibold text-gray-300">

                  <Shield
                    size={16}
                    className="text-cyan-400"
                  />

                  Home Team
                </label>

                <select
                  name="homeTeam"
                  value={
                    formData.homeTeam
                  }
                  onChange={
                    handleChange
                  }
                  className="w-full h-14 rounded-2xl border border-white/10 bg-[#0B1627] px-5 text-white outline-none"
                >

                  {demoTeams.map(
                    (team) => (
                      <option
                        key={team}
                        value={team}
                      >
                        {team}
                      </option>
                    )
                  )}
                </select>
              </div>

              {/* AWAY */}
              <div>

                <label className="flex items-center gap-2 mb-3 text-sm font-semibold text-gray-300">

                  <Shield
                    size={16}
                    className="text-cyan-400"
                  />

                  Away Team
                </label>

                <select
                  name="awayTeam"
                  value={
                    formData.awayTeam
                  }
                  onChange={
                    handleChange
                  }
                  className="w-full h-14 rounded-2xl border border-white/10 bg-[#0B1627] px-5 text-white outline-none"
                >

                  {demoTeams.map(
                    (team) => (
                      <option
                        key={team}
                        value={team}
                      >
                        {team}
                      </option>
                    )
                  )}
                </select>
              </div>
            </div>

            {/* GROUP */}
            <div>

              <label className="flex items-center gap-2 mb-3 text-sm font-semibold text-gray-300">

                <Trophy
                  size={16}
                  className="text-cyan-400"
                />

                Group
              </label>

              <select
                name="group"
                value={
                  formData.group
                }
                onChange={
                  handleChange
                }
                className="w-full h-14 rounded-2xl border border-white/10 bg-[#0B1627] px-5 text-white outline-none"
              >

                <option value="Group A">
                  Group A
                </option>

                <option value="Group B">
                  Group B
                </option>

                <option value="Group C">
                  Group C
                </option>

                <option value="Group D">
                  Group D
                </option>
              </select>
            </div>

            {/* DATE + TIME */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

              <div>

                <label className="flex items-center gap-2 mb-3 text-sm font-semibold text-gray-300">

                  <CalendarDays
                    size={16}
                    className="text-cyan-400"
                  />

                  Match Date
                </label>

                <input
                  type="date"
                  name="date"
                  value={
                    formData.date
                  }
                  onChange={
                    handleChange
                  }
                  required
                  className="w-full h-14 rounded-2xl border border-white/10 bg-[#0B1627] px-5 text-white outline-none"
                />
              </div>

              <div>

                <label className="flex items-center gap-2 mb-3 text-sm font-semibold text-gray-300">

                  <Clock3
                    size={16}
                    className="text-cyan-400"
                  />

                  Match Time
                </label>

                <input
                  type="time"
                  name="time"
                  value={
                    formData.time
                  }
                  onChange={
                    handleChange
                  }
                  required
                  className="w-full h-14 rounded-2xl border border-white/10 bg-[#0B1627] px-5 text-white outline-none"
                />
              </div>
            </div>

            {/* PREVIEW */}
            <div className="p-6 border rounded-3xl border-cyan-400/10 bg-[#0B1627]">

              <p className="mb-3 text-sm font-semibold tracking-wider text-gray-400 uppercase">
                Match Preview
              </p>

              <h3 className="text-2xl font-extrabold text-center text-white">

                {
                  formData.homeTeam
                }

                <span className="mx-3 text-cyan-300">
                  VS
                </span>

                {
                  formData.awayTeam
                }
              </h3>
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={
                isPending
              }
              className="flex items-center justify-center w-full gap-3 text-sm font-bold text-black transition-all duration-300 h-14 rounded-2xl bg-cyan-300 hover:scale-[1.01]"
            >

              <Save size={18} />

              {isPending
                ? "Saving..."
                : "Save Match"}
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
};

export default AddMatch;