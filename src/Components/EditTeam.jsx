import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import {
  ArrowLeft,
  Save,
  Shield,
  Users,
  Search,
  UserPlus,
  X,
} from "lucide-react";

import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import useAxiosPublic from "../Hooks/useAxiosPublic";

import { toast } from "react-toastify";

const EditTeam = () => {
  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const axiosPublic =
    useAxiosPublic();

  const [team, setTeam] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [players, setPlayers] =
    useState([]);

  const [
    selectedPlayers,
    setSelectedPlayers,
  ] = useState([]);

  const [search, setSearch] =
    useState("");

  /* ======================================
      GET SINGLE TEAM
  ====================================== */
  useEffect(() => {
    fetch(
      `http://localhost:5000/teams/${id}`
    )
      .then((res) => res.json())
      .then((data) => {
        setTeam(data);

        setSelectedPlayers(
          data.players || []
        );

        setLoading(false);
      });
  }, [id]);

  /* ======================================
      SEARCH PLAYER
  ====================================== */
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

  /* ======================================
      ADD PLAYER
  ====================================== */
  const handleAddPlayer =
    (player) => {
      const exists =
        selectedPlayers.find(
          (p) =>
            p._id ===
            player._id
        );

      if (exists) {
        toast.error(
          "Player already added"
        );

        return;
      }

      setSelectedPlayers([
        ...selectedPlayers,
        player,
      ]);

      toast.success(
        "Player added"
      );
    };

  /* ======================================
      REMOVE PLAYER
  ====================================== */
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

      toast.error(
        "Player removed"
      );
    };

  /* ======================================
      UPDATE TEAM
  ====================================== */
  const handleUpdate =
    async (e) => {
      e.preventDefault();

      const form =
        e.target;

      const updatedTeam = {
        name: form.name.value,

        shortName:
          form.shortName.value,

        owner:
          form.owner.value,

        ownerPhone:
          form.ownerPhone
            .value,

        group:
          form.group.value,

        logo:
          form.logo.value,

        banner:
          form.banner.value,

        players:
          selectedPlayers,
      };

      try {
        const res =
          await fetch(
            `http://localhost:5000/teams/${id}`,
            {
              method: "PATCH",

              headers: {
                "content-type":
                  "application/json",
              },

              body: JSON.stringify(
                updatedTeam
              ),
            }
          );

        const data =
          await res.json();

        if (
          data.modifiedCount >
          0
        ) {
          toast.success(
            "Team updated successfully"
          );

          navigate(
            "/dashboard/adminTeams"
          );
        }
      } catch (error) {
        console.log(error);
      }
    };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white bg-[#030B18]">
        Loading...
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#030B18] text-white p-6">
      {/* TOP */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          to="/dashboard/adminTeams"
          className="flex items-center justify-center border w-12 h-12 rounded-2xl border-white/10 bg-[#071120]"
        >
          <ArrowLeft />
        </Link>

        <div>
          <h2 className="text-4xl font-black">
            Edit Team
          </h2>

          <p className="mt-2 text-gray-400">
            Update team &
            manage players
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* LEFT */}
        <div className="space-y-8 lg:col-span-2">
          {/* FORM */}
          <form
            onSubmit={
              handleUpdate
            }
            className="p-8 border border-white/10 rounded-3xl bg-[#071120]"
          >
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* TEAM NAME */}
              <div>
                <label className="block mb-3 text-sm text-gray-400">
                  Team Name
                </label>

                <input
                  type="text"
                  name="name"
                  defaultValue={
                    team.name
                  }
                  className="w-full h-14 px-5 border rounded-2xl border-white/10 bg-[#0B1627]"
                />
              </div>

              {/* SHORT NAME */}
              <div>
                <label className="block mb-3 text-sm text-gray-400">
                  Short Name
                </label>

                <input
                  type="text"
                  name="shortName"
                  defaultValue={
                    team.shortName
                  }
                  className="w-full h-14 px-5 border rounded-2xl border-white/10 bg-[#0B1627]"
                />
              </div>

              {/* OWNER */}
              <div>
                <label className="block mb-3 text-sm text-gray-400">
                  Owner
                </label>

                <input
                  type="text"
                  name="owner"
                  defaultValue={
                    team.owner
                  }
                  className="w-full h-14 px-5 border rounded-2xl border-white/10 bg-[#0B1627]"
                />
              </div>

              {/* PHONE */}
              <div>
                <label className="block mb-3 text-sm text-gray-400">
                  Owner Phone
                </label>

                <input
                  type="text"
                  name="ownerPhone"
                  defaultValue={
                    team.ownerPhone
                  }
                  className="w-full h-14 px-5 border rounded-2xl border-white/10 bg-[#0B1627]"
                />
              </div>

              {/* GROUP */}
              <div>
                <label className="block mb-3 text-sm text-gray-400">
                  Group
                </label>

                <input
                  type="text"
                  name="group"
                  defaultValue={
                    team.group
                  }
                  className="w-full h-14 px-5 border rounded-2xl border-white/10 bg-[#0B1627]"
                />
              </div>

              {/* LOGO */}
              <div>
                <label className="block mb-3 text-sm text-gray-400">
                  Logo URL
                </label>

                <input
                  type="text"
                  name="logo"
                  defaultValue={
                    team.logo
                  }
                  className="w-full h-14 px-5 border rounded-2xl border-white/10 bg-[#0B1627]"
                />
              </div>
            </div>

            {/* BANNER */}
            <div className="mt-6">
              <label className="block mb-3 text-sm text-gray-400">
                Banner URL
              </label>

              <input
                type="text"
                name="banner"
                defaultValue={
                  team.banner
                }
                className="w-full h-14 px-5 border rounded-2xl border-white/10 bg-[#0B1627]"
              />
            </div>
  {/* SEARCH PLAYER */}
          <div className=" mt-4 border border-white/10 rounded-3xl bg-[#071120]">
            <div className="flex items-center gap-3 p-6 mb-6">
              <Users className="text-cyan-300" />

              <h3 className="text-2xl font-black">
                Manage Players
              </h3>
            </div>

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
                className="w-full h-14 pl-12 pr-4 border rounded-2xl border-white/10 bg-[#0B1627]"
              />
            </div>

            {/* SEARCH RESULT */}
            {players.length >
              0 && (
              <div className="pt-2 mt-6 space-y-3">
                {players.map(
                  (player) => (
                    <div
                      key={
                        player._id
                      }
                      className="flex items-center justify-between p-4 border rounded-2xl border-white/10 bg-[#0B1627]"
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
                        className="flex items-center gap-2 px-4 font-semibold text-black h-11 rounded-xl bg-cyan-300"
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
            {/* SAVE */}
            <button className="flex items-center justify-center gap-3 px-6 mt-8 font-bold text-black transition-all duration-300 h-14 rounded-2xl bg-cyan-300 hover:scale-[1.02]">
              <Save size={18} />
              Save Changes
            </button>
          </form>

        
        </div>

        {/* RIGHT */}
        <div className="space-y-6">
          {/* TEAM CARD */}
          <div className="p-6 border border-white/10 rounded-3xl bg-[#071120]">
            <div className="flex flex-col items-center text-center">
              <div className="overflow-hidden border rounded-3xl w-28 h-28 border-white/10">
                <img
                  src={
                    team.logo ||
                    "https://i.ibb.co/jvY69xhW/player-icon.png"
                  }
                  alt=""
                  className="object-cover w-full h-full"
                />
              </div>

              <h2 className="mt-5 text-2xl font-black">
                {team.name}
              </h2>

              <p className="mt-2 text-gray-400">
                {
                  team.group
                }
              </p>
            </div>
          </div>

          {/* SELECTED PLAYERS */}
          <div className="p-6 border border-white/10 rounded-3xl bg-[#071120]">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Users className="text-cyan-300" />

                <h3 className="text-xl font-bold">
                  Team Players
                </h3>
              </div>

              <span className="px-4 py-2 text-sm rounded-full bg-cyan-400/10 text-cyan-300">
                {
                  selectedPlayers.length
                }{" "}
                Players
              </span>
            </div>

            <div className="space-y-4 max-h-[700px] overflow-y-auto pr-2">
              {selectedPlayers.map(
                (player) => (
                  <div
                    key={
                      player._id
                    }
                    className="flex items-center gap-4 p-4 border rounded-2xl border-white/10 bg-[#0B1627]"
                  >
                    <div className="overflow-hidden rounded-xl w-14 h-14">
                      <img
                        src={
                          player.photo
                        }
                        alt=""
                        className="object-cover w-full h-full"
                      />
                    </div>

                    <div>
                      <h4 className="font-bold">
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

                    <button
                      type="button"
                      onClick={() =>
                        handleRemovePlayer(
                          player._id
                        )
                      }
                      className="flex items-center justify-center w-10 h-10 ml-auto text-red-400 rounded-xl bg-red-500/10"
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
        </div>
      </div>
    </section>
  );
};

export default EditTeam;