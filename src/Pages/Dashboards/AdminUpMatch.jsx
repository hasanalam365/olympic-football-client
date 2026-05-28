import React from "react";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import useAxiosPublic from "../../Hooks/useAxiosPublic";

const AdminUpMatch = () => {
  const axiosPublic =
    useAxiosPublic();

  const queryClient =
    useQueryClient();

  /* GET MATCHES */
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

  /* UPDATE UPCOMING */
  const upcomingMutation =
    useMutation({
      mutationFn: async (
        match
      ) => {
        const res =
          await axiosPublic.patch(
            `/matches/${match._id}`,
            {
              isUpcoming:
                !match.isUpcoming,
            }
          );

        return res.data;
      },

      onSuccess: () => {
        queryClient.invalidateQueries(
          ["matches"]
        );

        queryClient.invalidateQueries(
          [
            "upcomingMatches",
          ]
        );
      },
    });

  if (isLoading) {
    return (
      <div className="p-6">

        <div className="space-y-4">

          {[1, 2, 3, 4].map(
            (item) => (
              <div
                key={item}
                className="h-[100px] rounded-2xl bg-[#071120] animate-pulse"
              />
            )
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">

      <h2 className="mb-8 text-3xl font-bold text-white">

        Select Upcoming
        Matches
      </h2>

      <div className="space-y-4">

        {matches.map(
          (match) => (
            <div
              key={
                match._id
              }
              className="flex items-center justify-between p-5 border rounded-2xl border-cyan-400/10 bg-[#071120]"
            >

              <div>

                <h3 className="font-bold text-white">

                  {
                    match.homeTeam
                  }{" "}
                  vs{" "}
                  {
                    match.awayTeam
                  }
                </h3>

                <p className="mt-1 text-sm text-gray-400">

                  {match.date} •{" "}
                  {match.time}
                </p>
              </div>

              <button
                onClick={() =>
                  upcomingMutation.mutate(
                    match
                  )
                }
                className={`px-5 py-2 rounded-xl font-semibold transition-all duration-300 ${
                  match.isUpcoming
                    ? "bg-cyan-400 text-black"
                    : "bg-white/10 text-white"
                }`}
              >
                {match.isUpcoming
                  ? "Selected"
                  : "Select"}
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default AdminUpMatch;