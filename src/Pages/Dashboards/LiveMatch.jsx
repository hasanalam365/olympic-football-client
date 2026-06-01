import React, {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";

import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  Play,
  Pause,
  RotateCcw,
  Plus,
  Minus,
  Trophy,
  Flag,
} from "lucide-react";

import useAxiosPublic from "../../Hooks/useAxiosPublic";

const LiveMatch = () => {
  const { id } =useParams();
    

  const axiosPublic = useAxiosPublic();

  const queryClient = useQueryClient();

  const [homeScore, setHomeScore] = useState(0);

  const [awayScore, setAwayScore] = useState(0);

  const [seconds, setSeconds] =useState(0);

  const [running, setRunning] =useState(false);

  const [status, setStatus] = useState("Not Started");

  /* =====================
      GET LIVE MATCH
  ====================== */

 const {
  data: liveMatch,
  isLoading,
} = useQuery({
  queryKey: [
    "liveMatch",
    id,
  ],

  queryFn: async () => {
    const res =
      await axiosPublic.get(
        `/live-match/${id}`
      );

    return res.data;
  },

  refetchInterval: 3000,
});

  useEffect(() => {
  if (liveMatch) {
    setHomeScore(
      liveMatch.homeScore || 0
    );

    setAwayScore(
      liveMatch.awayScore || 0
    );

    setStatus(
      liveMatch.status ||
        "Not Started"
    );

    setSeconds(
      liveMatch.timerSeconds || 0
    );

    setRunning(
      liveMatch.isRunning || false
    );
  }
}, [liveMatch]);

const {
  data: homeTeamData,
} = useQuery({
  queryKey: [
    "homeTeam",
    liveMatch?.homeTeam,
  ],

  enabled:
    !!liveMatch?.homeTeam,

  queryFn: async () => {
    const res =
      await axiosPublic.get(
        `/teams/team-name/${encodeURIComponent(
          liveMatch.homeTeam
        )}`
      );

    return res.data;
  },
});


const {
  data: awayTeamData,
} = useQuery({
  queryKey: [
    "awayTeam",
    liveMatch?.awayTeam,
  ],

  enabled:
    !!liveMatch?.awayTeam,

  queryFn: async () => {
    const res =
      await axiosPublic.get(
        `/teams/team-name/${encodeURIComponent(
          liveMatch.awayTeam
        )}`
      );

    return res.data;
  },
});


  /* =====================
      TIMER
  ====================== */

 useEffect(() => {
  let interval;

  if (
    running &&
    status !==
      "Finished"
  ) {
    interval =
      setInterval(() => {
        setSeconds(
          (prev) =>
            prev + 1
        );
      }, 1000);
  }

  return () =>
    clearInterval(
      interval
    );
}, [
  running,
  status,
]);


  const timerMutation =
  useMutation({
    mutationFn: async (
      data
    ) => {
      const res =
        await axiosPublic.patch(
          `/live-match/timer/${id}`,
          data
        );

      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries(
        {
          queryKey: [
            "liveMatch",
            id,
          ],
        }
      );
    },
  });

  /* =====================
      UPDATE MATCH
  ====================== */

  const updateMutation =
    useMutation({
      mutationFn: async (
        data
      ) => {
        const res =
          await axiosPublic.patch(
            `/live-match/score/${id}`,
            data
          );

        return res.data;
      },

      onSuccess: () => {
        queryClient.invalidateQueries(
          {
            queryKey: [
              "liveMatch",
              id,
            ],
          }
        );
      },
    });

useEffect(() => {
  if (
    !running ||
    status ===
      "Finished"
  )
    return;

  const saveInterval =
    setInterval(() => {
      timerMutation.mutate({
        timerSeconds:
          seconds,

        isRunning:
          true,

        status:
          "LIVE",
      });
    }, 5000);

  return () =>
    clearInterval(
      saveInterval
    );
}, [
  running,
  seconds,
  status,
]);

  /* =====================
      SCORE FUNCTIONS
  ====================== */

  const addHomeGoal =
    () => {
      const newScore =
        homeScore + 1;

      setHomeScore(
        newScore
      );

      updateMutation.mutate(
        {
          homeScore:
            newScore,

          awayScore,

          status,
        }
      );
    };

  const minusHomeGoal =
    () => {
      const newScore =
        Math.max(
          0,
          homeScore - 1
        );

      setHomeScore(
        newScore
      );

      updateMutation.mutate(
        {
          homeScore:
            newScore,

          awayScore,

          status,
        }
      );
    };

  const addAwayGoal =
    () => {
      const newScore =
        awayScore + 1;

      setAwayScore(
        newScore
      );

      updateMutation.mutate(
        {
          homeScore,

          awayScore:
            newScore,

          status,
        }
      );
    };

  const minusAwayGoal =
    () => {
      const newScore =
        Math.max(
          0,
          awayScore - 1
        );

      setAwayScore(
        newScore
      );

      updateMutation.mutate(
        {
          homeScore,

          awayScore:
            newScore,

          status,
        }
      );
    };

  /* =====================
      MATCH CONTROL
  ====================== */

 const startMatch =
  () => {
    setRunning(true);

    setStatus("LIVE");

    timerMutation.mutate({
      timerSeconds:
        seconds,

      isRunning: true,

      startedAt:
        new Date(),

      status:
        "LIVE",
    });
  };

const pauseMatch =
  () => {
    setRunning(false);

    timerMutation.mutate({
      timerSeconds:
        seconds,

      isRunning:
        false,

      startedAt:
        null,

      status,
    });
  };

 const resetMatch =
  () => {
    setRunning(false);

    timerMutation.mutate({
      timerSeconds:
        seconds,

      isRunning:
        false,

      status,
    });
  };
const finishMatch =
  () => {
    setRunning(false);

    setStatus(
      "Finished"
    );

    setSeconds(0);

    timerMutation.mutate({
      timerSeconds: 0,

      isRunning:
        false,

      startedAt:
        null,

      status:
        "Finished",
    });

    updateMutation.mutate({
      homeScore,

      awayScore,

      status:
        "Finished",
    });
  };

  const formatTime =
    () => {
      const mins =
        Math.floor(
          seconds / 60
        );

      const secs =
        seconds % 60;

      return `${String(
        mins
      ).padStart(
        2,
        "0"
      )}:${String(
        secs
      ).padStart(
        2,
        "0"
      )}`;
    };





  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white bg-slate-950">
        Loading...
      </div>
    );
  }


  

  return (
    <div className="min-h-screen p-4 text-white bg-slate-950">

      <div className="max-w-6xl mx-auto">

        {/* Header */}

        <div className="mb-10 text-center">

          <h1 className="text-4xl font-bold">
            LIVE MATCH
          </h1>

          <p className="mt-2 text-gray-400">
            {
              liveMatch?.homeTeam
            }{" "}
            VS{" "}
            {
              liveMatch?.awayTeam
            }
          </p>
        </div>

        {/* Timer */}

        <div className="p-6 mb-6 text-center bg-slate-900 rounded-3xl">

          <h2 className="text-6xl font-bold">
            {formatTime()}
          </h2>

          <div className="flex justify-center gap-3 mt-5">

            <button
              onClick={
                startMatch
              }
              className="btn btn-success"
            >
              <Play />
            </button>

            <button
              onClick={
                pauseMatch
              }
              className="btn btn-warning"
            >
              <Pause />
            </button>

            <button
              onClick={
                resetMatch
              }
              className="btn btn-error"
            >
              <RotateCcw />
            </button>
          </div>

          <div className="mt-5">
            <span className="badge badge-lg">
              {status}
            </span>
          </div>
        </div>

        {/* Scoreboard */}

        <div className="p-8 bg-slate-900 rounded-3xl">

          <div className="grid items-center gap-8 md:grid-cols-3">

            {/* HOME */}

            <div className="text-center">

              <h2 className="text-2xl font-bold">
                {
                  liveMatch?.homeTeam
                }
              </h2>

              <div className="my-5 font-bold text-8xl">
                {homeScore}
              </div>

              <div className="flex justify-center gap-3">

                <button
                  onClick={
                    addHomeGoal
                  }
                  className="btn btn-success"
                >
                  <Plus />
                </button>

                <button
                  onClick={
                    minusHomeGoal
                  }
                  className="btn btn-error"
                >
                  <Minus />
                </button>
              </div>
            </div>

            {/* VS */}

            <div className="text-center">

              <Trophy
                size={80}
                className="mx-auto text-yellow-400"
              />

              <h2 className="mt-4 text-5xl font-bold">
                VS
              </h2>
            </div>

            {/* AWAY */}

            <div className="text-center">

              <h2 className="text-2xl font-bold">
                {
                  liveMatch?.awayTeam
                }
              </h2>

              <div className="my-5 font-bold text-8xl">
                {awayScore}
              </div>

              <div className="flex justify-center gap-3">

                <button
                  onClick={
                    addAwayGoal
                  }
                  className="btn btn-success"
                >
                  <Plus />
                </button>

                <button
                  onClick={
                    minusAwayGoal
                  }
                  className="btn btn-error"
                >
                  <Minus />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Players */}

        <div className="grid gap-6 mt-8 md:grid-cols-2">

       <div className="p-5 bg-slate-900 rounded-3xl">
  <h3 className="mb-4 text-xl font-bold">
    {liveMatch?.homeTeam} Players
  </h3>

  <div className="space-y-2">
    {homeTeamData?.players?.map(
      (player) => (
        <div
          key={player._id}
          className="flex items-center gap-3 p-2 rounded bg-slate-800"
        >
          <img
            src={player.photo}
            alt={player.name}
            className="object-cover w-10 h-10 rounded-full"
          />

          <span>
            {player.name}
          </span>
        </div>
      )
    )}
  </div>
</div>

         <div className="p-5 bg-slate-900 rounded-3xl">
  <h3 className="mb-4 text-xl font-bold">
    {liveMatch?.awayTeam} Players
  </h3>

  <div className="space-y-2">
    {awayTeamData?.players?.map(
      (player) => (
        <div
          key={player._id}
          className="flex items-center gap-3 p-2 rounded bg-slate-800"
        >
          <img
            src={player.photo}
            alt={player.name}
            className="object-cover w-10 h-10 rounded-full"
          />

          <span>
            {player.name}
          </span>
        </div>
      )
    )}
  </div>
</div>
        </div>

        {/* Finish */}

        <div className="mt-10 text-center">

          <button
            onClick={
              finishMatch
            }
            className="btn btn-error btn-lg"
          >
            <Flag />
            Finish Match
          </button>
        </div>
      </div>
    </div>
  );
};

export default LiveMatch;