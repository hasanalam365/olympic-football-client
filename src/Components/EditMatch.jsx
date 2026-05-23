// EditMatch.jsx

import React, {
  useEffect,
  useState,
} from "react";

import {
  ArrowLeft,
  Save,
} from "lucide-react";

import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import useAxiosPublic from "../Hooks/useAxiosPublic";

import { toast } from "react-toastify";

const EditMatch = () => {
  const { id } = useParams();

  const navigate =
    useNavigate();

  const axiosPublic =
    useAxiosPublic();

  const queryClient =
    useQueryClient();

  const [formData, setFormData] =
    useState({
      homeTeam: "",
      awayTeam: "",
      group: "",
      date: "",
      time: "",
      status: "scheduled",
      homeScore: 0,
      awayScore: 0,
    });

  /* =========================================
     GET SINGLE MATCH
  ========================================= */
  const { data: matchData } =
    useQuery({
      queryKey: ["match", id],

      queryFn: async () => {
        const res =
          await axiosPublic.get(
            `/matches/${id}`
          );

        return res.data;
      },
    });

  /* =========================================
     SET DATA
  ========================================= */
  useEffect(() => {
    if (matchData) {
      setFormData(matchData);
    }
  }, [matchData]);

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
     UPDATE MATCH
  ========================================= */
  const updateMutation =
    useMutation({
      mutationFn: async (
        updatedData
      ) => {
        const res =
          await axiosPublic.patch(
            `/matches/${id}`,
            updatedData
          );

        return res.data;
      },

      onSuccess: () => {
        toast.success(
          "Match updated successfully"
        );

        queryClient.invalidateQueries(
          ["matches"]
        );

        navigate(
          "/dashboard/adminMatches"
        );
      },

      onError: () => {
        toast.error(
          "Failed to update match"
        );
      },
    });

  /* =========================================
     SUBMIT
  ========================================= */
  const handleSubmit = (e) => {
    e.preventDefault();

    updateMutation.mutate(
      formData
    );
  };

  return (
    <section className="min-h-screen bg-[#030B18] px-4 py-8 text-white">

      <div className="max-w-4xl mx-auto">

        <div className="flex items-center justify-between mb-10">

          <div>
            <h2 className="text-4xl font-extrabold">
              Edit Match
            </h2>

            <p className="mt-2 text-gray-400">
              Update match info
            </p>
          </div>

          <Link
            to="/dashboard/adminMatches"
            className="flex items-center gap-2 px-5 h-12 rounded-2xl border border-white/10 bg-[#071120]"
          >
            <ArrowLeft size={18} />

            Back
          </Link>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-8 border rounded-3xl border-cyan-400/10 bg-[#071120] space-y-6"
        >

          <input
            type="text"
            name="homeTeam"
            value={
              formData.homeTeam
            }
            onChange={
              handleChange
            }
            placeholder="Home Team"
            className="w-full h-14 px-5 rounded-2xl bg-[#0B1627] border border-white/10"
          />

          <input
            type="text"
            name="awayTeam"
            value={
              formData.awayTeam
            }
            onChange={
              handleChange
            }
            placeholder="Away Team"
            className="w-full h-14 px-5 rounded-2xl bg-[#0B1627] border border-white/10"
          />

          <input
            type="text"
            name="group"
            value={formData.group}
            onChange={
              handleChange
            }
            placeholder="Group"
            className="w-full h-14 px-5 rounded-2xl bg-[#0B1627] border border-white/10"
          />

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={
              handleChange
            }
            className="w-full h-14 px-5 rounded-2xl bg-[#0B1627] border border-white/10"
          />

          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={
              handleChange
            }
            className="w-full h-14 px-5 rounded-2xl bg-[#0B1627] border border-white/10"
          />

          <select
            name="status"
            value={
              formData.status
            }
            onChange={
              handleChange
            }
            className="w-full h-14 px-5 rounded-2xl bg-[#0B1627] border border-white/10"
          >
            <option value="scheduled">
              Scheduled
            </option>

            <option value="live">
              Live
            </option>

            <option value="completed">
              Completed
            </option>
          </select>

          <div className="grid grid-cols-2 gap-5">

            <input
              type="number"
              name="homeScore"
              value={
                formData.homeScore
              }
              onChange={
                handleChange
              }
              placeholder="Home Score"
              className="w-full h-14 px-5 rounded-2xl bg-[#0B1627] border border-white/10"
            />

            <input
              type="number"
              name="awayScore"
              value={
                formData.awayScore
              }
              onChange={
                handleChange
              }
              placeholder="Away Score"
              className="w-full h-14 px-5 rounded-2xl bg-[#0B1627] border border-white/10"
            />
          </div>

          <button
            type="submit"
            className="flex items-center justify-center w-full gap-3 font-bold text-black h-14 rounded-2xl bg-cyan-300"
          >

            <Save size={18} />

            Update Match
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditMatch;