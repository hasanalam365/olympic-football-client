// AddTeam.jsx

import React from "react";

import { ArrowLeft } from "lucide-react";

import { Link, useNavigate } from "react-router-dom";

import useAxiosPublic from "../Hooks/useAxiosPublic";

const AddTeam = () => {

  const navigate = useNavigate();

  const axiosPublic = useAxiosPublic();

  const image_hosting_key =
    import.meta.env.VITE_IMAGE_HOST_KEY;

  const image_upload_url =
    `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  const handleAddTeam = async (e) => {

    e.preventDefault();

    const form = e.target;

    const logoFile =
      form.logo.files[0];

    const bannerFile =
      form.banner.files[0];

    try {

      /* =========================
          LOGO UPLOAD
      ========================= */

      const logoData =
        new FormData();

      logoData.append(
        "image",
        logoFile
      );

      const logoRes =
        await axiosPublic.post(
          image_upload_url,
          logoData,
          {
            headers: {
              "content-type":
                "multipart/form-data",
            },
          }
        );

      /* =========================
          BANNER UPLOAD
      ========================= */

      const bannerData =
        new FormData();

      bannerData.append(
        "image",
        bannerFile
      );

      const bannerRes =
        await axiosPublic.post(
          image_upload_url,
          bannerData,
          {
            headers: {
              "content-type":
                "multipart/form-data",
            },
          }
        );

      /* =========================
          CHECK SUCCESS
      ========================= */

      if (
        !logoRes.data.success ||
        !bannerRes.data.success
      ) {

        alert(
          "Image Upload Failed"
        );

        return;
      }

      /* =========================
          FINAL TEAM DATA
      ========================= */

      const teamData = {

        name: form.name.value,

        shortName:
          form.shortName.value,

        owner:
          form.owner.value,

        

        group:
          form.group.value,

        played: Number(
          form.played.value
        ),

        win: Number(
          form.win.value
        ),

        draw: Number(
          form.draw.value
        ),

        lose: Number(
          form.lose.value
        ),

        gf: Number(
          form.gf.value
        ),

        ga: Number(
          form.ga.value
        ),

        points: Number(
          form.points.value
        ),

        logo:
          logoRes.data.data
            .display_url,

        banner:
          bannerRes.data.data
            .display_url,

        createdAt: new Date(),
      };

      /* =========================
          SAVE TO DATABASE
      ========================= */

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

        form.reset();

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

      {/* TOP */}
      <div className="flex items-center justify-between mb-10">

        <div>

          <h2 className="text-4xl font-extrabold">
            Add New Team
          </h2>

          <p className="mt-2 text-gray-400">
            Create and manage tournament teams
          </p>
        </div>

        <Link
          to="/dashboard/adminTeams"
          className="flex items-center gap-2 px-5 h-12 rounded-2xl border border-white/10 bg-[#071120] hover:border-cyan-400/30 transition-all"
        >

          <ArrowLeft size={18} />

          Back
        </Link>
      </div>

      {/* FORM */}
      <div className="max-w-4xl p-8 border border-cyan-400/10 rounded-3xl bg-[#071120]">

        <form
          onSubmit={
            handleAddTeam
          }
          className="space-y-6"
        >

          {/* BASIC INFO */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

            <div>

              <label className="block mb-2 text-sm text-gray-300">
                Team Name
              </label>

              <input
                type="text"
                name="name"
                required
                className="w-full h-14 px-4 rounded-2xl border border-white/10 bg-[#0B1627] outline-none"
              />
            </div>

            <div>

              <label className="block mb-2 text-sm text-gray-300">
                Short Name
              </label>

              <input
                type="text"
                name="shortName"
                required
                className="w-full h-14 px-4 rounded-2xl border border-white/10 bg-[#0B1627] outline-none"
              />
            </div>

            <div>

              <label className="block mb-2 text-sm text-gray-300">
                owner
              </label>

              <input
                type="text"
                name="owner"
                required
                className="w-full h-14 px-4 rounded-2xl border border-white/10 bg-[#0B1627] outline-none"
              />
            </div>

           
          </div>

          {/* GROUP */}
          <div>

            <label className="block mb-2 text-sm text-gray-300">
              Group
            </label>

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
          </div>

          {/* IMAGES */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

            <div>

              <label className="block mb-2 text-sm text-gray-300">
                Team Logo
              </label>

              <input
                type="file"
                name="logo"
                required
                className="w-full p-4 rounded-2xl border border-white/10 bg-[#0B1627]"
              />
            </div>

            <div>

              <label className="block mb-2 text-sm text-gray-300">
                Team Banner
              </label>

              <input
                type="file"
                name="banner"
                required
                className="w-full p-4 rounded-2xl border border-white/10 bg-[#0B1627]"
              />
            </div>
          </div>

          {/* STATS */}
          <div>

            <h3 className="mb-4 text-xl font-bold">
              Team Stats
            </h3>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-7">

              <input
                type="number"
                name="played"
                placeholder="Played"
                defaultValue={0}
                className="h-14 px-4 rounded-2xl border border-white/10 bg-[#0B1627]"
              />

              <input
                type="number"
                name="win"
                placeholder="Wins"
                defaultValue={0}
                className="h-14 px-4 rounded-2xl border border-white/10 bg-[#0B1627]"
              />

              <input
                type="number"
                name="draw"
                placeholder="Draws"
                defaultValue={0}
                className="h-14 px-4 rounded-2xl border border-white/10 bg-[#0B1627]"
              />

              <input
                type="number"
                name="lose"
                placeholder="Loses"
                defaultValue={0}
                className="h-14 px-4 rounded-2xl border border-white/10 bg-[#0B1627]"
              />

              <input
                type="number"
                name="gf"
                placeholder="GF"
                defaultValue={0}
                className="h-14 px-4 rounded-2xl border border-white/10 bg-[#0B1627]"
              />

              <input
                type="number"
                name="ga"
                placeholder="GA"
                defaultValue={0}
                className="h-14 px-4 rounded-2xl border border-white/10 bg-[#0B1627]"
              />

              <input
                type="number"
                name="points"
                placeholder="Points"
                defaultValue={0}
                className="h-14 px-4 rounded-2xl border border-white/10 bg-[#0B1627]"
              />
            </div>
          </div>

          {/* BUTTON */}
          <div className="pt-4">

            <button
              type="submit"
              className="px-8 h-14 rounded-2xl bg-cyan-300 text-black font-bold hover:scale-[1.02] transition-all"
            >

              Save Team
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddTeam;