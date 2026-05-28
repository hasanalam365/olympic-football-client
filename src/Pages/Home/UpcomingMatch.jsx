import React from "react";

import {
  CalendarDays,
  MapPin,
} from "lucide-react";

import { motion } from "framer-motion";

import {
  useQuery,
} from "@tanstack/react-query";

import useAxiosPublic from "../../Hooks/useAxiosPublic";

const UpcomingMatch = () => {
  const axiosPublic =
    useAxiosPublic();

  /* GET UPCOMING MATCHES */
  const {
    data: matches = [],
    isLoading,
  } = useQuery({
    queryKey: [
      "upcomingMatches",
    ],

    queryFn: async () => {
      const res =
        await axiosPublic.get(
          "/matches/upcoming"
        );

      return res.data;
    },
  });

  if (isLoading) {
    return (
      <section className="bg-[#030B18] py-20 px-6">

        <div className="grid grid-cols-1 mx-auto gap-7 max-w-7xl lg:grid-cols-2">

          {[1, 2].map(
            (item) => (
              <div
                key={item}
                className="h-[280px] rounded-3xl bg-[#071120] animate-pulse"
              />
            )
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#030B18] py-20 px-6">

      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <div className="mb-14">

          <h2 className="text-4xl font-extrabold tracking-tight text-white uppercase md:text-5xl">

            Upcoming Fixtures
          </h2>

          <p className="mt-3 text-sm text-gray-400 md:text-base">

            Don&apos;t miss
            the action
          </p>

          <div className="w-14 h-[2px] mt-5 bg-cyan-400 rounded-full" />
        </div>

        {/* EMPTY */}
        {matches.length ===
          0 && (
          <div className="py-16 text-center border rounded-3xl border-cyan-400/10 bg-[#071120]">

            <h3 className="text-2xl font-bold text-white">

              No Upcoming
              Matches
            </h3>
          </div>
        )}

        {/* MATCH GRID */}
        <div className="grid grid-cols-1 gap-7 lg:grid-cols-2">

          {matches.map(
            (
              match,
              index
            ) => (
              <motion.div
                key={
                  match._id
                }
                initial={{
                  opacity: 0,
                  y: 40,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.6,
                  delay:
                    index *
                    0.15,
                }}
                viewport={{
                  once: true,
                }}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#071120] p-7 transition-all duration-500 hover:border-cyan-400/40 hover:shadow-[0_0_45px_rgba(34,211,238,0.18)]"
              >

                {/* GLOW */}
                <div className="absolute top-0 right-0 w-40 h-40 transition-all duration-500 rounded-full opacity-0 blur-3xl bg-cyan-400/10 group-hover:opacity-100" />

                {/* TOP */}
                <div className="flex items-center justify-between">

                  <span className="text-xs tracking-[2px] font-semibold text-gray-500 uppercase">

                    {
                      match.group
                    }
                  </span>

                  <div className="flex items-center gap-2 text-xs text-gray-500">

                    <MapPin
                      size={
                        13
                      }
                    />

                    সর্দারবাড়ী মাঠ প্রাঙ্গন
                  </div>
                </div>

                {/* MATCH */}
                <div className="flex items-center justify-between mt-9">

                  {/* HOME */}
                  <div className="flex items-center gap-4">

                    <div className="flex items-center justify-center w-12 h-12 text-sm font-bold text-white rounded-full bg-white/10">

                      {match.homeTeam
                        ?.slice(
                          0,
                          2
                        )}
                    </div>

                    <h3 className="text-base font-bold text-white">

                      {
                        match.homeTeam
                      }
                    </h3>
                  </div>

                  {/* VS */}
                  <span className="text-sm font-semibold tracking-[3px] text-gray-500 uppercase">

                    VS
                  </span>

                  {/* AWAY */}
                  <div className="flex items-center gap-4">

                    <h3 className="text-base font-bold text-white">

                      {
                        match.awayTeam
                      }
                    </h3>

                    <div className="flex items-center justify-center w-12 h-12 text-sm font-bold text-white rounded-full bg-white/10">

                      {match.awayTeam
                        ?.slice(
                          0,
                          2
                        )}
                    </div>
                  </div>
                </div>

                {/* DIVIDER */}
                <div className="h-px my-7 bg-white/10" />

                {/* DATE */}
                <div className="flex items-center gap-3 text-sm text-gray-400">

                  <CalendarDays
                    size={16}
                    className="text-cyan-400"
                  />

                  {match.date} •{" "}
                  {match.time}
                </div>
              </motion.div>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default UpcomingMatch;