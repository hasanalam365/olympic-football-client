// EditPlayer.jsx

import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import {
  ArrowLeft,
  Save,
  Upload,
} from "lucide-react";

import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import useAxiosPublic from "../Hooks/useAxiosPublic";

import { toast } from "react-toastify";

const EditPlayer = () => {
  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const axiosPublic =
    useAxiosPublic();

  const [player, setPlayer] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const image_hosting_key =
    import.meta.env
      .VITE_IMAGE_HOST_KEY;

  const image_upload_url =
    `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  /* ======================================
      GET SINGLE PLAYER
  ====================================== */
  useEffect(() => {
    const getPlayer =
      async () => {
        try {
          const res =
            await axiosPublic.get(
              `/players/${id}`
            );

          setPlayer(
            res.data
          );

          setLoading(false);
        } catch (error) {
          console.log(error);

          setLoading(false);
        }
      };

    getPlayer();
  }, [axiosPublic, id]);

  /* ======================================
      UPDATE PLAYER
  ====================================== */
  const handleUpdate =
    async (e) => {
      e.preventDefault();

      const form =
        e.target;

      let photoUrl =
        player?.photo;

      try {
        /* =========================
            UPLOAD NEW PHOTO
        ========================= */
        if (
          form.photo.files[0]
        ) {
          const photoData =
            new FormData();

          photoData.append(
            "image",
            form.photo.files[0]
          );

          const photoRes =
            await axios.post(
              image_upload_url,
              photoData,
              {
                headers: {
                  "content-type":
                    "multipart/form-data",
                },
              }
            );

          photoUrl =
            photoRes.data.data
              .display_url;
        }

        /* =========================
            UPDATED PLAYER
        ========================= */
        const updatedPlayer =
          {
            name:
              form.name.value,

            age: Number(
              form.age.value
            ),

            phoneNumber:
              form.phoneNumber
                .value,

            bloodGroup:
              form.bloodGroup
                .value,

            totalGoals:
              Number(
                form.totalGoals
                  .value
              ),

            yellowCards:
              Number(
                form.yellowCards
                  .value
              ),

            redCards:
              Number(
                form.redCards
                  .value
              ),

            match: Number(
              form.match.value
            ),

            photo: photoUrl,
          };

        const res =
          await axiosPublic.patch(
            `/players/${id}`,
            updatedPlayer
          );

        if (
          res.data.modifiedCount >
          0
        ) {
          toast.success(
            "Player updated successfully"
          );

          navigate(
            "/dashboard/adminPlayers"
          );
        }
      } catch (error) {
        console.log(error);

        toast.error(
          "Something went wrong"
        );
      }
    };

  /* ======================================
      LOADING
  ====================================== */
  if (
    loading ||
    !player
  ) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white bg-[#030B18]">
        Loading...
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#030B18] text-white p-4 md:p-6">
      {/* HEADER */}
      <div className="flex flex-col gap-5 mb-8 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-extrabold md:text-4xl">
            Edit Player
          </h2>

          <p className="mt-2 text-gray-400">
            Update player
            information
          </p>
        </div>

        {/* BACK */}
        <Link
          to="/dashboard/adminPlayers"
          className="flex items-center justify-center gap-2 px-5 h-12 rounded-2xl border border-white/10 bg-[#071120] hover:border-cyan-400/30 transition-all"
        >
          <ArrowLeft
            size={18}
          />

          Back
        </Link>
      </div>

      {/* MAIN */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* LEFT */}
        <div className="lg:col-span-2">
          <div className="p-5 md:p-8 rounded-3xl border border-cyan-400/10 bg-[#071120]">
            <form
              onSubmit={
                handleUpdate
              }
              className="space-y-8"
            >
              {/* BASIC INFO */}
              <div>
                <h3 className="mb-5 text-xl font-bold">
                  Basic Info
                </h3>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  {/* NAME */}
                  <div>
                    <label className="block mb-2 text-sm text-gray-300">
                      Player Name
                    </label>

                    <input
                      type="text"
                      name="name"
                      defaultValue={
                        player?.name
                      }
                      required
                      className="w-full h-14 px-4 rounded-2xl border border-white/10 bg-[#0B1627] outline-none focus:border-cyan-400/30"
                    />
                  </div>

                  {/* AGE */}
                  <div>
                    <label className="block mb-2 text-sm text-gray-300">
                      Age
                    </label>

                    <input
                      type="number"
                      name="age"
                      defaultValue={
                        player?.age
                      }
                      required
                      className="w-full h-14 px-4 rounded-2xl border border-white/10 bg-[#0B1627] outline-none focus:border-cyan-400/30"
                    />
                  </div>

                  {/* PHONE */}
                  <div>
                    <label className="block mb-2 text-sm text-gray-300">
                      Phone Number
                    </label>

                    <input
                      type="text"
                      name="phoneNumber"
                      defaultValue={
                        player?.phoneNumber
                      }
                      required
                      className="w-full h-14 px-4 rounded-2xl border border-white/10 bg-[#0B1627] outline-none focus:border-cyan-400/30"
                    />
                  </div>

                  {/* BLOOD */}
                  <div>
                    <label className="block mb-2 text-sm text-gray-300">
                      Blood Group
                    </label>

                    <select
                      name="bloodGroup"
                      defaultValue={
                        player?.bloodGroup
                      }
                      className="w-full h-14 px-4 rounded-2xl border border-white/10 bg-[#0B1627] outline-none focus:border-cyan-400/30"
                    >
                      <option value="">
                        Select Blood
                        Group
                      </option>

                      <option>
                        A+
                      </option>

                      <option>
                        A-
                      </option>

                      <option>
                        B+
                      </option>

                      <option>
                        B-
                      </option>

                      <option>
                        AB+
                      </option>

                      <option>
                        AB-
                      </option>

                      <option>
                        O+
                      </option>

                      <option>
                        O-
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              {/* PHOTO */}
              <div>
                <h3 className="mb-5 text-xl font-bold">
                  Player Photo
                </h3>

                <label className="flex flex-col items-center justify-center gap-3 p-8 text-center border border-dashed rounded-3xl cursor-pointer border-white/10 bg-[#0B1627] hover:border-cyan-400/30 transition-all">
                  <Upload
                    size={34}
                    className="text-cyan-300"
                  />

                  <div>
                    <p className="font-semibold">
                      Upload New
                      Photo
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      PNG, JPG or
                      WEBP
                    </p>
                  </div>

                  <input
                    type="file"
                    name="photo"
                    className="hidden"
                  />
                </label>
              </div>

              {/* STATS */}
              <div>
                <h3 className="mb-5 text-xl font-bold">
                  Player Stats
                </h3>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-4">
                  {/* GOALS */}
                  <div>
                    <label className="block mb-2 text-sm text-gray-300">
                      Goals
                    </label>

                    <input
                      type="number"
                      name="totalGoals"
                      defaultValue={
                        player?.totalGoals
                      }
                      className="w-full h-14 px-4 rounded-2xl border border-white/10 bg-[#0B1627]"
                    />
                  </div>

                  {/* YELLOW */}
                  <div>
                    <label className="block mb-2 text-sm text-gray-300">
                      Yellow Cards
                    </label>

                    <input
                      type="number"
                      name="yellowCards"
                      defaultValue={
                        player?.yellowCards
                      }
                      className="w-full h-14 px-4 rounded-2xl border border-white/10 bg-[#0B1627]"
                    />
                  </div>

                  {/* RED */}
                  <div>
                    <label className="block mb-2 text-sm text-gray-300">
                      Red Cards
                    </label>

                    <input
                      type="number"
                      name="redCards"
                      defaultValue={
                        player?.redCards
                      }
                      className="w-full h-14 px-4 rounded-2xl border border-white/10 bg-[#0B1627]"
                    />
                  </div>

                  {/* MATCH */}
                  <div>
                    <label className="block mb-2 text-sm text-gray-300">
                      Matches
                    </label>

                    <input
                      type="number"
                      name="match"
                      defaultValue={
                        player?.match
                      }
                      className="w-full h-14 px-4 rounded-2xl border border-white/10 bg-[#0B1627]"
                    />
                  </div>
                </div>
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                className="flex items-center justify-center gap-3 px-8 font-bold text-black transition-all duration-300 h-14 rounded-2xl bg-cyan-300 hover:scale-[1.02]"
              >
                <Save
                  size={18}
                />

                Save Changes
              </button>
            </form>
          </div>
        </div>

        {/* RIGHT */}
        <div>
          <div className="p-6 border border-white/10 rounded-3xl bg-[#071120]">
            <div className="flex flex-col items-center text-center">
              <div className="w-32 h-32 overflow-hidden border rounded-3xl border-white/10">
                <img
                  src={
                    player?.photo
                  }
                  alt=""
                  className="object-cover w-full h-full"
                />
              </div>

              <h2 className="mt-5 text-2xl font-black">
                {
                  player?.name
                }
              </h2>

              <p className="mt-2 text-gray-400">
                Age:{" "}
                {
                  player?.age
                }
              </p>

              <div className="grid w-full grid-cols-2 gap-4 mt-6">
                <div className="p-4 rounded-2xl bg-[#0B1627]">
                  <p className="text-sm text-gray-400">
                    Goals
                  </p>

                  <h3 className="mt-1 text-2xl font-black text-cyan-300">
                    {
                      player?.totalGoals
                    }
                  </h3>
                </div>

                <div className="p-4 rounded-2xl bg-[#0B1627]">
                  <p className="text-sm text-gray-400">
                    Matches
                  </p>

                  <h3 className="mt-1 text-2xl font-black text-cyan-300">
                    {
                      player?.match
                    }
                  </h3>
                </div>
              </div>
            </div>
          </div>

          {/* TEAM HISTORY */}
          <div className="p-6 mt-6 border border-white/10 rounded-3xl bg-[#071120]">
            <h3 className="mb-5 text-xl font-bold">
              Team History
            </h3>

            <div className="space-y-4">
              {player
                ?.teamMembers
                ?.length > 0 ? (
                player.teamMembers.map(
                  (
                    team,
                    index
                  ) => (
                    <div
                      key={index}
                      className="p-4 rounded-2xl bg-[#0B1627]"
                    >
                      <h4 className="font-bold">
                        {
                          team.teamName
                        }
                      </h4>

                      <p className="mt-1 text-sm text-gray-400">
                        Year:{" "}
                        {
                          team.year
                        }
                      </p>

                      <p className="mt-1 text-sm text-gray-400">
                        Goals:{" "}
                        {
                          team.goals
                        }{" "}
                        • Match:{" "}
                        {
                          team.match
                        }
                      </p>
                    </div>
                  )
                )
              ) : (
                <p className="text-gray-500">
                  No team history
                  found
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditPlayer;