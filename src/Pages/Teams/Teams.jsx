// Teams.jsx

import React from "react";
import {
  MapPin,
  Shield,
} from "lucide-react";

import { motion } from "framer-motion";

const teams = [
  {
    id: 1,
    name: "Blaze Dynamo",
    coach: "Marco Silva",
    record: "4-0-2",
    founded: "2018",
    stadium: "Nova Arena",
  },

  {
    id: 2,
    name: "Falcon Athletic",
    coach: "David Cooper",
    record: "5-1-0",
    founded: "2019",
    stadium: "Sky Stadium",
  },

  {
    id: 3,
    name: "Iron Wolves",
    coach: "Luis Ramirez",
    record: "3-2-3",
    founded: "2017",
    stadium: "Iron Dome",
  },

  {
    id: 4,
    name: "Phoenix United",
    coach: "Thomas Miller",
    record: "6-0-0",
    founded: "2020",
    stadium: "Phoenix Arena",
  },

  {
    id: 5,
    name: "Royal Eagles",
    coach: "Carlos Mendes",
    record: "5-0-1",
    founded: "2016",
    stadium: "Royal Park",
  },

  {
    id: 6,
    name: "Storm City",
    coach: "Lucas Brown",
    record: "3-3-0",
    founded: "2015",
    stadium: "Storm Field",
  },

  {
    id: 7,
    name: "Thunder FC",
    coach: "Robert Wilson",
    record: "4-1-1",
    founded: "2021",
    stadium: "Thunder Arena",
  },

  {
    id: 8,
    name: "Titan Warriors",
    coach: "Daniel Stone",
    record: "2-2-2",
    founded: "2014",
    stadium: "Titan Stadium",
  },
];

const Teams = () => {
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

        {/* GRID */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">

          {teams.map((team, index) => (
            <motion.div
              key={team.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
              }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-3xl border border-cyan-400/10 bg-[#071120] transition-all duration-500 hover:border-cyan-400/30 hover:shadow-[0_0_45px_rgba(34,211,238,0.14)]"
            >

              {/* TOP GRADIENT */}
              <div className="relative h-28 overflow-hidden bg-gradient-to-br from-[#111C33] via-[#111827] to-[#1A2440]">

                {/* GLOW */}
                <div className="absolute top-0 right-0 w-40 h-40 transition-all duration-500 rounded-full opacity-0 blur-3xl bg-cyan-400/10 group-hover:opacity-100" />

                {/* LOGO */}
                <div className="absolute bottom-[-22px] left-6 flex items-center justify-center w-14 h-14 border shadow-xl rounded-2xl border-white/10 bg-[#111827] backdrop-blur-xl">

                  <Shield
                    size={22}
                    className="text-cyan-300"
                  />
                </div>
              </div>

              {/* CONTENT */}
              <div className="px-6 pt-10 pb-6">

                {/* TEAM NAME */}
                <h3 className="text-xl font-extrabold text-white transition-all duration-300 group-hover:text-cyan-300">
                  {team.name}
                </h3>

                {/* COACH */}
                <p className="mt-2 text-sm text-gray-500">
                  Coach: {team.coach} • {team.record}
                </p>

                {/* DIVIDER */}
                <div className="h-px my-5 bg-white/10" />

                {/* FOOTER */}
                <div className="flex items-center justify-between">

                  {/* STADIUM */}
                  <div className="flex items-center gap-2 text-sm text-gray-400">

                    <MapPin
                      size={15}
                      className="text-cyan-400"
                    />

                    {team.stadium}
                  </div>

                  {/* FOUNDED */}
                  <span className="text-sm font-semibold text-cyan-300">
                    FWD {team.founded}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Teams;