import React, {
  useState,
} from "react";

import axios from "axios";

import {
  ArrowLeft,
  Search,
  UserPlus,
  X,
} from "lucide-react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import useAxiosPublic from "../Hooks/useAxiosPublic";

const AddTeam = () => {

  const navigate =
    useNavigate();

  const axiosPublic =
    useAxiosPublic();

  const [
    players,
    setPlayers,
  ] = useState([]);

  const [
    selectedPlayers,
    setSelectedPlayers,
  ] = useState([]);

  const [
    search,
    setSearch,
  ] = useState("");

  const image_hosting_key =
    import.meta.env
      .VITE_IMAGE_HOST_KEY;

  const image_upload_url =
    `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  // SEARCH PLAYER
  const handleSearch =
    async (value) => {

      setSearch(value);

      if (!value) {

        setPlayers([]);

        return;
      }

      try {

        const res =
          await axiosPublic.get(
            `/teams/searchPlayers?search=${value}`
          );

        setPlayers(
          res.data
        );

      } catch (error) {

        console.log(error);
      }
    };

  // ADD PLAYER
  const handleAddPlayer =
    (player) => {

      const exists =
        selectedPlayers.find(
          (p) =>
            p._id ===
            player._id
        );

      if (exists) return;

      setSelectedPlayers([
        ...selectedPlayers,
        player,
      ]);
    };

  // REMOVE PLAYER
  const handleRemovePlayer =
    (id) => {

      const remaining =
        selectedPlayers.filter(
          (p) =>
            p._id !== id
        );

      setSelectedPlayers(
        remaining
      );
    };

  // SUBMIT
  const handleAddTeam =
    async (e) => {

      e.preventDefault();

      const form =
        e.target;

      try {

        let logoUrl = "";
        let bannerUrl =
          "";

        // LOGO
        if (
          form.logo.files[0]
        ) {

          const logoData =
            new FormData();

          logoData.append(
            "image",
            form.logo.files[0]
          );

          const logoRes =
            await axios.post(
              image_upload_url,
              logoData
            );

          logoUrl =
            logoRes.data.data
              .display_url;
        }

        // BANNER
        if (
          form.banner.files[0]
        ) {

          const bannerData =
            new FormData();

          bannerData.append(
            "image",
            form.banner.files[0]
          );

          const bannerRes =
            await axios.post(
              image_upload_url,
              bannerData
            );

          bannerUrl =
            bannerRes.data.data
              .display_url;
        }

        // TEAM DATA
        const teamData = {

          name:
            form.name.value,

          shortName:
            form.shortName
              .value,

          owner:
            form.owner.value,

          ownerPhone:
            form.ownerPhone
              .value,

          group:
            form.group.value,

          logo: logoUrl,

          banner:
            bannerUrl,

          players:
            selectedPlayers,

          createdAt:
            new Date(),
        };

        const res =
          await axiosPublic.post(
            "/teams",
            teamData
          );

        if (
          res.data.insertedId
        ) {

          alert(
            "Team Added Successfully"
          );

          navigate(
            "/dashboard/adminTeams"
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
      <div className="flex items-center justify-between mb-10">

        <div>

          <h2 className="text-4xl font-extrabold">
            Add New Team
          </h2>

          <p className="mt-2 text-gray-400">
            Create football
            team and add
            players
          </p>
        </div>

        <Link
          to="/dashboard/adminTeams"
          className="flex items-center gap-2 px-5 h-12 rounded-2xl border border-white/10 bg-[#071120]"
        >

          <ArrowLeft size={18} />

          Back
        </Link>
      </div>

      {/* FORM */}
      <div className="max-w-5xl p-8 rounded-3xl border border-cyan-400/10 bg-[#071120]">

        <form
          onSubmit={
            handleAddTeam
          }
          className="space-y-8"
        >

          {/* BASIC */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

            <input
              type="text"
              name="name"
              required
              placeholder="Team Name"
              className="w-full h-14 px-4 rounded-2xl border border-white/10 bg-[#0B1627]"
            />

            <input
              type="text"
              name="shortName"
              required
              placeholder="Short Name"
              className="w-full h-14 px-4 rounded-2xl border border-white/10 bg-[#0B1627]"
            />

            <input
              type="text"
              name="owner"
              required
              placeholder="Owner Name"
              className="w-full h-14 px-4 rounded-2xl border border-white/10 bg-[#0B1627]"
            />

            <input
              type="text"
              name="ownerPhone"
              required
              placeholder="Owner Phone"
              className="w-full h-14 px-4 rounded-2xl border border-white/10 bg-[#0B1627]"
            />
          </div>

          {/* GROUP */}
          <select
            name="group"
            className="w-full h-14 px-4 rounded-2xl border border-white/10 bg-[#0B1627]"
          >

            <option>
              Group A
            </option>

            <option>
              Group B
            </option>
          </select>

          {/* IMAGES */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

            <input
              type="file"
              name="logo"
              className="w-full p-4 rounded-2xl border border-white/10 bg-[#0B1627]"
            />

            <input
              type="file"
              name="banner"
              className="w-full p-4 rounded-2xl border border-white/10 bg-[#0B1627]"
            />
          </div>

          {/* SEARCH PLAYER */}
          <div>

            <h3 className="mb-4 text-xl font-bold">
              Add Players
            </h3>

            <div className="relative">

              <Search
                className="absolute text-gray-500 left-4 top-4"
                size={18}
              />

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  handleSearch(
                    e.target.value
                  )
                }
                placeholder="Search player by name or phone..."
                className="w-full h-14 pl-12 pr-4 rounded-2xl border border-white/10 bg-[#0B1627]"
              />
            </div>

            {/* SEARCH RESULT */}
            {players.length >
              0 && (
              <div className="mt-4 space-y-3">

                {players.map(
                  (player) => (
                    <div
                      key={
                        player._id
                      }
                      className="flex items-center justify-between p-4 rounded-2xl bg-[#0B1627]"
                    >

                      <div className="flex items-center gap-4">

                        <img
                          src={
                            player.photo
                          }
                          alt=""
                          className="object-cover w-12 h-12 rounded-full"
                        />

                        <div>

                          <h4 className="font-semibold">
                            {
                              player.name
                            }
                          </h4>

                          <p className="text-sm text-gray-400">
                            {
                              player.phoneNumber
                            }
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          handleAddPlayer(
                            player
                          )
                        }
                        className="flex items-center h-10 gap-2 px-4 font-semibold text-black rounded-xl bg-cyan-300"
                      >

                        <UserPlus
                          size={16}
                        />

                        Add
                      </button>
                    </div>
                  )
                )}
              </div>
            )}
          </div>

          {/* SELECTED */}
          <div>

            <h3 className="mb-4 text-xl font-bold">
              Selected Players
            </h3>

            <div className="space-y-3">

              {selectedPlayers.map(
                (player) => (
                  <div
                    key={
                      player._id
                    }
                    className="flex items-center justify-between p-4 rounded-2xl bg-[#0B1627]"
                  >

                    <div className="flex items-center gap-4">

                      <img
                        src={
                          player.photo
                        }
                        alt=""
                        className="object-cover w-12 h-12 rounded-full"
                      />

                      <div>

                        <h4 className="font-semibold">
                          {
                            player.name
                          }
                        </h4>

                        <p className="text-sm text-gray-400">
                          {
                            player.phoneNumber
                          }
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        handleRemovePlayer(
                          player._id
                        )
                      }
                      className="flex items-center justify-center w-10 h-10 text-red-400 rounded-xl bg-red-500/10"
                    >

                      <X
                        size={18}
                      />
                    </button>
                  </div>
                )
              )}
            </div>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="px-8 font-bold text-black h-14 rounded-2xl bg-cyan-300"
          >

            Save Team
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddTeam;