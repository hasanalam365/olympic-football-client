// ===========================================
// FULL UPDATED EditTeam.jsx
// ===========================================

import React, {
  useEffect,
  useState,
} from "react";

import {
  ArrowLeft,
  Save,
  Users,
  Search,
  UserPlus,
  X,
  Trophy,
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

    const getTeam =
      async () => {

        try {

          const res =
            await axiosPublic.get(
              `/teams/${id}`
            );

          setTeam(
            res.data
          );

          setSelectedPlayers(
            res.data.players ||
              []
          );

          setLoading(false);

        } catch (error) {

          console.log(error);

          setLoading(false);
        }
      };

    getTeam();

  }, [id, axiosPublic]);

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

        name:
          form.name.value,

        shortName:
          form.shortName.value,

        owner:
          form.owner.value,

        ownerPhone:
          form.ownerPhone.value,

        group:
          form.group.value,

        logo:
          form.logo.value,

        banner:
          form.banner.value,

        players:
          selectedPlayers,

        // STATS
        match:
          Number(
            form.match.value
          ),

        win:
          Number(
            form.win.value
          ),

        draw:
          Number(
            form.draw.value
          ),

        lose:
          Number(
            form.lose.value
          ),

        totalGoals:
          Number(
            form.totalGoals.value
          ),

        points:
          Number(
            form.win.value
          ) *
            3 +
          Number(
            form.draw.value
          ),
      };

      try {

        const res =
          await axiosPublic.patch(
            `/teams/${id}`,
            updatedTeam
          );

        if (
          res.data.modifiedCount >
          0
        ) {

          toast.success(
            "Team updated successfully"
          );

          navigate(
            "/dashboard/teams"
          );
        }

      } catch (error) {

        console.log(error);

        toast.error(
          "Failed to update team"
        );
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
    <section className="min-h-screen bg-[#030B18] text-white p-4 md:p-6">

      {/* TOP */}
      <div className="flex flex-col gap-4 mb-8 sm:flex-row sm:items-center">

        <Link
          to="/dashboard/teams"
          className="flex items-center justify-center border w-12 h-12 rounded-2xl border-white/10 bg-[#071120]"
        >
          <ArrowLeft />
        </Link>

        <div>

          <h2 className="text-3xl font-black md:text-4xl">
            Edit Team
          </h2>

          <p className="mt-2 text-gray-400">
            Update team & manage players
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">

        {/* LEFT */}
        <div className="space-y-8 lg:col-span-2">

          <form
            onSubmit={
              handleUpdate
            }
            className="p-5 border md:p-8 border-white/10 rounded-3xl bg-[#071120]"
          >

            {/* TEAM INFO */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

              <div>
                <label className="block mb-3 text-sm text-gray-400">
                  Team Name
                </label>

                <input
                  type="text"
                  name="name"
                  defaultValue={
                    team?.name
                  }
                  className="w-full h-14 px-5 border rounded-2xl border-white/10 bg-[#0B1627] outline-none"
                />
              </div>

              <div>
                <label className="block mb-3 text-sm text-gray-400">
                  Short Name
                </label>

                <input
                  type="text"
                  name="shortName"
                  defaultValue={
                    team?.shortName
                  }
                  className="w-full h-14 px-5 border rounded-2xl border-white/10 bg-[#0B1627] outline-none"
                />
              </div>

              <div>
                <label className="block mb-3 text-sm text-gray-400">
                  Owner
                </label>

                <input
                  type="text"
                  name="owner"
                  defaultValue={
                    team?.owner
                  }
                  className="w-full h-14 px-5 border rounded-2xl border-white/10 bg-[#0B1627] outline-none"
                />
              </div>

              <div>
                <label className="block mb-3 text-sm text-gray-400">
                  Owner Phone
                </label>

                <input
                  type="text"
                  name="ownerPhone"
                  defaultValue={
                    team?.ownerPhone
                  }
                  className="w-full h-14 px-5 border rounded-2xl border-white/10 bg-[#0B1627] outline-none"
                />
              </div>

              <div>
                <label className="block mb-3 text-sm text-gray-400">
                  Group
                </label>

                <input
                  type="text"
                  name="group"
                  defaultValue={
                    team?.group
                  }
                  className="w-full h-14 px-5 border rounded-2xl border-white/10 bg-[#0B1627] outline-none"
                />
              </div>

              <div>
                <label className="block mb-3 text-sm text-gray-400">
                  Logo URL
                </label>

                <input
                  type="text"
                  name="logo"
                  defaultValue={
                    team?.logo
                  }
                  className="w-full h-14 px-5 border rounded-2xl border-white/10 bg-[#0B1627] outline-none"
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
                  team?.banner
                }
                className="w-full h-14 px-5 border rounded-2xl border-white/10 bg-[#0B1627] outline-none"
              />
            </div>

            {/* TEAM STATS */}
            <div className="p-5 mt-8 border border-white/10 rounded-3xl bg-[#0B1627]">

              <div className="flex items-center gap-3 mb-6">

                <Trophy className="text-cyan-300" />

                <h3 className="text-xl font-black">
                  Team Statistics
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-6 md:grid-cols-5">

                <div>
                  <label className="block mb-3 text-sm text-gray-400">
                    Match
                  </label>

                  <input
                    type="number"
                    name="match"
                    defaultValue={
                      team?.match || 0
                    }
                    className="w-full h-14 px-5 border rounded-2xl border-white/10 bg-[#071120] outline-none"
                  />
                </div>

                <div>
                  <label className="block mb-3 text-sm text-gray-400">
                    Win
                  </label>

                  <input
                    type="number"
                    name="win"
                    defaultValue={
                      team?.win || 0
                    }
                    className="w-full h-14 px-5 border rounded-2xl border-white/10 bg-[#071120] outline-none"
                  />
                </div>

                <div>
                  <label className="block mb-3 text-sm text-gray-400">
                    Draw
                  </label>

                  <input
                    type="number"
                    name="draw"
                    defaultValue={
                      team?.draw || 0
                    }
                    className="w-full h-14 px-5 border rounded-2xl border-white/10 bg-[#071120] outline-none"
                  />
                </div>

                <div>
                  <label className="block mb-3 text-sm text-gray-400">
                    Lose
                  </label>

                  <input
                    type="number"
                    name="lose"
                    defaultValue={
                      team?.lose || 0
                    }
                    className="w-full h-14 px-5 border rounded-2xl border-white/10 bg-[#071120] outline-none"
                  />
                </div>

                <div>
                  <label className="block mb-3 text-sm text-gray-400">
                    Goals
                  </label>

                  <input
                    type="number"
                    name="totalGoals"
                    defaultValue={
                      team?.totalGoals || 0
                    }
                    className="w-full h-14 px-5 border rounded-2xl border-white/10 bg-[#071120] outline-none"
                  />
                </div>
              </div>
            </div>

            {/* SEARCH PLAYER */}
            <div className="mt-8 border border-white/10 rounded-3xl bg-[#071120] p-4 md:p-6">

              <div className="flex items-center gap-3 mb-6">

                <Users className="text-cyan-300" />

                <h3 className="text-xl font-black md:text-2xl">
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
                  placeholder="Search player..."
                  className="w-full h-14 pl-12 pr-4 border rounded-2xl border-white/10 bg-[#0B1627] outline-none"
                />
              </div>

              {players.length >
                0 && (

                <div className="pt-2 mt-6 space-y-3">

                  {players.map(
                    (
                      player
                    ) => (

                      <div
                        key={
                          player._id
                        }
                        className="flex flex-col gap-4 p-4 border sm:flex-row sm:items-center sm:justify-between rounded-2xl border-white/10 bg-[#0B1627]"
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
                          className="flex items-center justify-center gap-2 px-4 font-semibold text-black transition-all h-11 rounded-xl bg-cyan-300 hover:scale-[1.02]"
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
            <button className="flex items-center justify-center w-full gap-3 px-6 mt-8 font-bold text-black transition-all duration-300 sm:w-auto h-14 rounded-2xl bg-cyan-300 hover:scale-[1.02]">

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
                    team?.logo ||
                    "https://i.ibb.co/jvY69xhW/player-icon.png"
                  }
                  alt=""
                  className="object-cover w-full h-full"
                />
              </div>

              <h2 className="mt-5 text-2xl font-black">
                {team?.name}
              </h2>

              <p className="mt-2 text-gray-400">
                {team?.group}
              </p>

              {/* STATS */}
              <div className="grid w-full grid-cols-3 gap-4 mt-8">

                <div className="p-3 rounded-2xl bg-[#0B1627]">
                  <h3 className="text-2xl font-black text-cyan-300">
                    {team?.points || 0}
                  </h3>

                  <p className="text-xs text-gray-400">
                    Points
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-[#0B1627]">
                  <h3 className="text-2xl font-black text-green-400">
                    {team?.win || 0}
                  </h3>

                  <p className="text-xs text-gray-400">
                    Wins
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-[#0B1627]">
                  <h3 className="text-2xl font-black text-red-400">
                    {team?.lose || 0}
                  </h3>

                  <p className="text-xs text-gray-400">
                    Lose
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* SELECTED PLAYERS */}
          <div className="p-6 border border-white/10 rounded-3xl bg-[#071120]">

            <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-center sm:justify-between">

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
                (
                  player
                ) => (

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

                    <div className="flex-1 min-w-0">

                      <h4 className="font-bold truncate">
                        {
                          player.name
                        }
                      </h4>

                      <p className="text-sm text-gray-400 truncate">
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
                      className="flex items-center justify-center flex-shrink-0 w-10 h-10 ml-auto text-red-400 rounded-xl bg-red-500/10"
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