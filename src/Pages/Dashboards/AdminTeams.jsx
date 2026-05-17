// AdminTeams.jsx

import React, { useEffect, useState } from "react";

import {
  Plus,
  Pencil,
  Trash2,
  Shield,
} from "lucide-react";

import { motion } from "framer-motion";

import { Link } from "react-router-dom";

const AdminTeams = () => {

  const [teams, setTeams] = useState([]);

  /* ======================================
      GET ALL TEAMS
  ====================================== */
  useEffect(() => {

    fetch("http://localhost:5000/teams")
      .then((res) => res.json())
      .then((data) => setTeams(data));

  }, []);

  /* ======================================
      DELETE TEAM
  ====================================== */
  const handleDelete = async (id) => {

    const confirmDelete =
      window.confirm(
        "Delete this team?"
      );

    if (!confirmDelete) return;

    try {

      const res = await fetch(
        `http://localhost:5000/teams/${id}`,
        {
          method: "DELETE",
        }
      );

      const data =
        await res.json();

      if (data.deletedCount > 0) {

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

  return (
    <section className="min-h-screen bg-[#030B18] text-white p-6">

      {/* HEADER */}
      <div className="flex flex-col gap-5 mb-10 md:flex-row md:items-center md:justify-between">

        {/* LEFT */}
        <div>

          <h2 className="text-4xl font-extrabold tracking-tight text-white">
            Teams
          </h2>

          <p className="mt-2 text-gray-400">
            Manage teams and standings
          </p>
        </div>

        {/* ADD BUTTON */}
        <Link
          to="/dashboard/addTeam"
          className="flex items-center justify-center gap-3 px-6 text-sm font-bold text-black transition-all duration-300 h-14 rounded-2xl bg-cyan-300 hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(103,232,249,0.35)]"
        >

          <Plus size={18} />

          Add Team
        </Link>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">

        {teams.map(
          (team, index) => (
            <motion.div
              key={team._id}
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
              className="group relative overflow-hidden rounded-2xl border border-cyan-400/10 bg-[#071120] p-6 transition-all duration-500 hover:border-cyan-400/30 hover:shadow-[0_0_35px_rgba(34,211,238,0.10)]"
            >

              {/* GLOW */}
              <div className="absolute top-0 right-0 w-40 h-40 transition-all duration-500 rounded-full opacity-0 blur-3xl bg-cyan-400/10 group-hover:opacity-100" />

              {/* TOP */}
              <div className="flex items-start gap-4">

                {/* LOGO */}
                <div className="overflow-hidden rounded-2xl w-14 h-14 bg-white/10">

                  <img
                    src={team.logo}
                    alt={team.name}
                    className="object-cover w-full h-full"
                  />
                </div>

                {/* INFO */}
                <div>

                  <h3 className="text-xl font-bold text-white transition-all duration-300 group-hover:text-cyan-300">
                    {team.name}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    {team.group} •{" "}
                    {
                      team.formation
                    }
                  </p>
                </div>
              </div>

              {/* STATS */}
              <div className="mt-6">

                <p className="text-sm text-gray-400">

                  P
                  {
                    team.played
                  }

                  {" "}W
                  {
                    team.win
                  }

                  {" "}D
                  {
                    team.draw
                  }

                  {" "}L
                  {
                    team.lose
                  }

                  <span className="ml-2 font-bold text-cyan-300">
                    {
                      team.points
                    }
                    pts
                  </span>
                </p>
              </div>

              {/* ACTIONS */}
              <div className="flex items-center gap-3 mt-6">

                {/* EDIT */}
                <button className="flex items-center justify-center w-11 h-11 rounded-xl border border-white/10 bg-[#0B1627] transition-all duration-300 hover:border-cyan-400/30 hover:text-cyan-300">

                  <Pencil size={17} />
                </button>

                {/* DELETE */}
                <button
                  onClick={() =>
                    handleDelete(
                      team._id
                    )
                  }
                  className="flex items-center justify-center w-11 h-11 rounded-xl border border-white/10 bg-[#0B1627] transition-all duration-300 hover:border-red-500/30 hover:text-red-400"
                >

                  <Trash2 size={17} />
                </button>

                {/* EXTRA ICON */}
                <div className="ml-auto">

                  <Shield
                    size={18}
                    className="text-cyan-400/60"
                  />
                </div>
              </div>
            </motion.div>
          )
        )}
      </div>

      {/* EMPTY STATE */}
      {teams.length === 0 && (

        <div className="flex flex-col items-center justify-center py-24 text-center">

          <div className="flex items-center justify-center w-24 h-24 mb-6 rounded-full bg-cyan-400/10">

            <Shield
              size={40}
              className="text-cyan-300"
            />
          </div>

          <h3 className="text-2xl font-bold text-white">
            No Teams Found
          </h3>

          <p className="mt-3 text-gray-400">
            Start by creating your first tournament team
          </p>

          <Link
            to="/dashboard/addTeam"
            className="flex items-center gap-3 px-6 mt-8 text-sm font-bold text-black transition-all duration-300 h-14 rounded-2xl bg-cyan-300 hover:scale-[1.03]"
          >

            <Plus size={18} />

            Add First Team
          </Link>
        </div>
      )}
    </section>
  );
};

export default AdminTeams;