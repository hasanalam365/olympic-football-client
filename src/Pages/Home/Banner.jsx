import React, {
  useEffect,
  useState,
} from "react";

import {
  Play,
  CalendarDays,
} from "lucide-react";

import {
  Link,
} from "react-router-dom";

import useAxiosPublic from "../../Hooks/useAxiosPublic";

const Banner = () => {
  const axiosPublic =
    useAxiosPublic();

  const [teams, setTeams] =
    useState([]);

  const [liveMatch, setLiveMatch] =
    useState(null);

  /* ======================
      TEAMS
  ====================== */

  useEffect(() => {
    const getTeams =
      async () => {
        try {
          const res =
            await axiosPublic.get(
              "/teams"
            );

          const sorted =
            [...res.data].sort(
              (a, b) =>
                b.points -
                a.points
            );

          setTeams(sorted);
        } catch (error) {
          console.log(error);
        }
      };

    getTeams();
  }, [axiosPublic]);

  /* ======================
      LIVE MATCH
  ====================== */

  useEffect(() => {
    const getLiveMatch =
      async () => {
        try {
          const res =
            await axiosPublic.get(
              "/live-match/current"
            );

          setLiveMatch(
            res.data
          );
        } catch (error) {
          console.log(error);
        }
      };

    getLiveMatch();

    const interval =
      setInterval(
        getLiveMatch,
        5000
      );

    return () =>
      clearInterval(
        interval
      );
  }, [axiosPublic]);

  const topTeam =
    teams['no'];

  const secondTeam =
    teams['no'];

  const hasLiveMatch =
    liveMatch &&
    liveMatch.status ===
      "LIVE";

  const liveMinute =
    Math.floor(
      Number(
        liveMatch?.timerSeconds ||
          0
      ) / 60
    );

  return (
    <section className="relative flex items-center justify-center py-20 overflow-hidden bg-[#030B18]">

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.12),transparent_35%)]" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,rgba(139,92,246,0.12),transparent_35%)]" />

      <div className="relative z-10 flex flex-col items-center justify-center w-full px-6 text-center max-w-7xl">

        {/* BADGE */}

        <div className="flex items-center gap-2 px-4 mb-4 border rounded-full border-cyan-400/20 bg-cyan-400/5 backdrop-blur-md">

          <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />

          <span className="text-[15px] font-bold tracking-[2px] uppercase text-cyan-300">
            পঞ্চম আসর
          </span>

        </div>

        {/* TITLE */}

        <div className="space-y-0 leading-none">

          <h2 className="mb-5 text-white font-extrabold uppercase tracking-tight text-[20px] md:text-[30px] lg:text-[40px]">
            সর্দারবাড়ী
          </h2>

          <h1 className="font-extrabold uppercase tracking-tight text-[50px] md:text-[70px] lg:text-[90px]">

            <span className="text-cyan-400">
              অলিম্পিক
            </span>{" "}

            <span className="text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text">
              টুর্নামেন্ট
            </span>

          </h1>

          <h2 className="mt-10 text-white font-extrabold uppercase tracking-tight text-[50px] md:text-[80px]">
            ২০২৬
          </h2>

        </div>

        {/* DESCRIPTION */}

        <p className="max-w-2xl mt-8 text-lg leading-8 text-gray-400 md:text-xl">
          Experience the ultimate football championship.
        </p>

        {/* BUTTONS */}

        <div className="flex flex-col items-center gap-5 mt-10 sm:flex-row">

          <button className="flex items-center gap-3 px-8 py-4 text-sm font-bold text-black transition-all duration-300 rounded-xl bg-cyan-400 hover:scale-105">

            <Play
              size={18}
              fill="black"
            />

            Live Matches

          </button>

          <Link
            to="/matches"
            className="flex items-center gap-3 px-8 py-4 text-sm font-semibold text-white transition-all duration-300 border rounded-xl border-white/10 bg-white/5 hover:bg-white/10"
          >

            <CalendarDays
              size={18}
            />

            View Schedule

          </Link>

        </div>

        {/* SCORE CARD */}

        <div className="relative w-full max-w-xl p-6 mt-16 overflow-hidden border shadow-2xl rounded-3xl border-cyan-400/20 bg-white/5 backdrop-blur-xl">

          <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-cyan-400/20 blur-3xl" />

          <div className="flex items-center justify-between mb-6">

            <div className="flex items-center gap-2">

              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />

              <span className="text-xs font-bold tracking-widest text-red-400 uppercase">

                {hasLiveMatch
                  ? "LIVE"
                  : "STANDBY"}

              </span>

            </div>

            <span className="text-xs tracking-wider text-gray-500 uppercase">

              {hasLiveMatch
                ? "MATCH IN PROGRESS"
                : "TOP TEAMS"}

            </span>

          </div>

          {hasLiveMatch ? (
            <>
              <div className="grid items-center grid-cols-3">

                <div className="text-center">

                  <h3 className="text-sm font-bold text-white">
                    {
                      liveMatch.homeTeam
                    }
                  </h3>

                  <h2 className="mt-3 text-6xl font-black text-cyan-300">
                    {
                      liveMatch.homeScore
                    }
                  </h2>

                </div>

                <div className="text-center">

                  <div className="inline-flex px-3 py-1 mb-3 text-xs font-bold text-red-400 border rounded-full border-red-500/30 bg-red-500/10">

                    LIVE

                  </div>

                  <h2 className="text-3xl font-black text-white">
                    VS
                  </h2>

                  <div className="mt-3 text-xl font-bold text-cyan-300">
                    {liveMinute}'
                  </div>

                </div>

                <div className="text-center">

                  <h3 className="text-sm font-bold text-white">
                    {
                      liveMatch.awayTeam
                    }
                  </h3>

                  <h2 className="mt-3 text-6xl font-black text-cyan-300">
                    {
                      liveMatch.awayScore
                    }
                  </h2>

                </div>

              </div>

              <div className="mt-6">

                <div className="w-full h-2 overflow-hidden rounded-full bg-white/10">

                  <div className="w-full h-full bg-gradient-to-r from-red-500 via-cyan-400 to-purple-500 animate-pulse" />

                </div>

              </div>

              <div className="mt-4 text-sm text-center text-gray-400">

                {
                  liveMatch.homeTeam
                }{" "}
                vs{" "}
                {
                  liveMatch.awayTeam
                }

              </div>
            </>
          ) : (
            <div className="flex items-center justify-between gap-3">

              <div className="flex flex-col items-center">

                <img
                  src={
                    topTeam?.logo ||
                    "https://i.ibb.co/jvY69xhW/player-icon.png"
                  }
                  alt=""
                  className="object-cover mb-2 rounded-full w-14 h-14"
                />

                <h3 className="text-sm font-semibold text-white">
                  {topTeam?.name ||
                    "Team 1"}
                </h3>

              </div>

              <div className="px-5 py-2 text-xl font-extrabold text-cyan-300 rounded-xl bg-cyan-400/10">

                {topTeam?.points ||
                  0}

                {" - "}

                {secondTeam?.points ||
                  0}

              </div>

              <div className="flex flex-col items-center">

                <img
                  src={
                    secondTeam?.logo ||
                    "https://i.ibb.co/jvY69xhW/player-icon.png"
                  }
                  alt=""
                  className="object-cover mb-2 rounded-full w-14 h-14"
                />

                <h3 className="text-sm font-semibold text-white">
                  {secondTeam?.name ||
                    "Team 2"}
                </h3>

              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
};

export default Banner;