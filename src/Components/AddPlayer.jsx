// AddPlayer.jsx

import React from "react";

import axios from "axios";

import {
  ArrowLeft,
  Upload,
} from "lucide-react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import useAxiosPublic from "../Hooks/useAxiosPublic";

const AddPlayer = () => {

  const navigate =
    useNavigate();

  const axiosPublic =
    useAxiosPublic();

  const image_hosting_key =
    import.meta.env.VITE_IMAGE_HOST_KEY;

  const image_upload_url =
    `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  const handleAddPlayer =
    async (e) => {

      e.preventDefault();

      const form =
        e.target;

      const photoFile =
        form.photo.files[0];

      try {

        /* =========================
            IMAGE UPLOAD
        ========================= */

        const photoData =
          new FormData();

        photoData.append(
          "image",
          photoFile
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

        if (
          !photoRes.data.success
        ) {

          alert(
            "Photo Upload Failed"
          );

          return;
        }

        /* =========================
            PLAYER DATA
        ========================= */

        const playerData = {

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
              .value || "",

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

          photo:
            photoRes.data.data
              .display_url,

          teamMembers: [],

          createdAt:
            new Date(),
        };

        /* =========================
            SAVE DATABASE
        ========================= */

        const res =
          await axiosPublic.post(
            "/players",
            playerData
          );

        if (
          res.data.insertedId
        ) {

          alert(
            "Player Added Successfully"
          );

          form.reset();

          navigate(
            "/dashboard/adminPlayers"
          );
        }

      } catch (error) {

        console.log(error);

        alert(
          "Something went wrong"
        );
      }
    };

  return (
    <section className="min-h-screen bg-[#030B18] text-white p-6">

      {/* HEADER */}
      <div className="flex flex-col gap-5 mb-10 md:flex-row md:items-center md:justify-between">

        <div>

          <h2 className="text-4xl font-extrabold tracking-tight">
            Add Player
          </h2>

          <p className="mt-2 text-gray-400">
            Create new player
            profile and stats
          </p>
        </div>

        {/* BACK BUTTON */}
        <Link
          to="/dashboard/adminPlayers"
          className="flex items-center justify-center gap-2 px-5 h-12 rounded-2xl border border-white/10 bg-[#071120] hover:border-cyan-400/30 transition-all"
        >

          <ArrowLeft size={18} />

          Back
        </Link>
      </div>

      {/* FORM */}
      <div className="max-w-5xl p-8 rounded-3xl border border-cyan-400/10 bg-[#071120]">

        <form
          onSubmit={
            handleAddPlayer
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
                  required
                  placeholder="Enter player name"
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
                  required
                  placeholder="Enter age"
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
                  required
                  placeholder="+880..."
                  className="w-full h-14 px-4 rounded-2xl border border-white/10 bg-[#0B1627] outline-none focus:border-cyan-400/30"
                />
              </div>

              {/* BLOOD GROUP */}
              <div>

                <label className="block mb-2 text-sm text-gray-300">
                  Blood Group
                  (Optional)
                </label>

                <select
                  name="bloodGroup"
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

            <label className="flex flex-col items-center justify-center gap-3 p-10 text-center border border-dashed rounded-3xl cursor-pointer border-white/10 bg-[#0B1627] hover:border-cyan-400/30 transition-all">

              <Upload
                size={34}
                className="text-cyan-300"
              />

              <div>

                <p className="font-semibold">
                  Upload Player
                  Photo
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  PNG, JPG or WEBP
                </p>
              </div>

              <input
                type="file"
                name="photo"
                required
                className="hidden"
              />
            </label>
          </div>

          {/* PLAYER STATS */}
          <div>

            <h3 className="mb-5 text-xl font-bold">
              Player Stats
            </h3>

            <div className="grid grid-cols-2 gap-5 md:grid-cols-4">

              {/* GOALS */}
              <div>

                <label className="block mb-2 text-sm text-gray-300">
                  Total Goals
                </label>

                <input
                  type="number"
                  name="totalGoals"
                  defaultValue={0}
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
                  defaultValue={0}
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
                  defaultValue={0}
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
                  defaultValue={0}
                  className="w-full h-14 px-4 rounded-2xl border border-white/10 bg-[#0B1627]"
                />
              </div>
            </div>
          </div>

          {/* TEAM HISTORY */}
          <div className="p-6 rounded-3xl border border-cyan-400/10 bg-[#0B1627]">

            <h3 className="text-xl font-bold">
              Team History
            </h3>

            <p className="mt-2 text-sm leading-relaxed text-gray-400">
              Team history data
              will be added
              automatically when
              the player joins
              teams and plays
              matches.
            </p>

            <div className="p-5 mt-5 text-sm text-gray-500 border border-dashed rounded-2xl border-white/10">
              teamMembers: []
            </div>
          </div>

          {/* BUTTON */}
          <div className="pt-2">

            <button
              type="submit"
              className="px-8 h-14 rounded-2xl bg-cyan-300 text-black font-bold hover:scale-[1.02] transition-all"
            >

              Save Player
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddPlayer;