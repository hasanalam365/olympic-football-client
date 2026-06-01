import React from "react";
import { motion } from "framer-motion";
import {
  Newspaper,
  Calendar,
  ArrowRight,
} from "lucide-react";

const newsData = [
  {
    id: 1,
    title:
      "আরাফ ফুটবল একাদশ দুর্দান্ত জয়ে সেমিফাইনালে",
    date: "01 June 2026",
    image:
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018",
    description:
      "গ্রুপ পর্বের শেষ ম্যাচে ৩-১ গোলে জয় তুলে নিয়ে সেমিফাইনাল নিশ্চিত করেছে আরাফ ফুটবল একাদশ।",
  },

  {
    id: 2,
    title:
      "মিষ্টার একাদশের নতুন স্ট্রাইকার চমক দেখাচ্ছেন",
    date: "30 May 2026",
    image:
      "https://images.unsplash.com/photo-1552667466-07770ae110d0",
    description:
      "টুর্নামেন্টে এখন পর্যন্ত সর্বোচ্চ গোলদাতার তালিকায় উঠে এসেছেন নতুন স্ট্রাইকার।",
  },

  {
    id: 3,
    title:
      "ফাইনাল ম্যাচের প্রস্তুতি শুরু",
    date: "28 May 2026",
    image:
      "https://images.unsplash.com/photo-1518604666860-9ed391f76460",
    description:
      "ফাইনাল ম্যাচকে ঘিরে মাঠ প্রস্তুত ও নিরাপত্তা ব্যবস্থা জোরদার করা হয়েছে।",
  },
];

const News = () => {
  return (
    <section className="min-h-screen bg-[#030B18] py-20 px-5">

      <div className="mx-auto max-w-7xl">

        {/* Header */}

        <div className="mb-12">

          <div className="flex items-center gap-3">

            <Newspaper
              size={30}
              className="text-cyan-400"
            />

            <h2 className="text-5xl font-black text-white uppercase">
              Tournament News
            </h2>
          </div>

          <p className="mt-4 text-gray-400">
            Latest updates, match reports
            and football tournament news.
          </p>

          <div className="w-20 h-[3px] mt-5 rounded-full bg-cyan-400" />
        </div>

        {/* Featured News */}

        <motion.div
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
          }}
          className="relative overflow-hidden rounded-3xl border border-cyan-400/10 bg-[#071120] mb-10"
        >

          <img
            src="https://images.unsplash.com/photo-1574629810360-7efbbe195018"
            alt=""
            className="object-cover w-full h-[350px]"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#030B18] via-[#030B18]/60 to-transparent" />

          <div className="absolute bottom-0 p-8">

            <span className="px-4 py-1 text-xs font-bold tracking-wider text-black uppercase rounded-full bg-cyan-400">
              Breaking News
            </span>

            <h3 className="mt-4 text-3xl font-bold text-white">
              সর্দারবাড়ী ঐতিহ্যবাহী মিনিবার
              ফুটবল টুর্নামেন্টে জমে উঠেছে
              সেমিফাইনালের লড়াই
            </h3>

            <p className="mt-3 text-gray-300">
              টুর্নামেন্টের প্রতিটি ম্যাচে
              দর্শকদের উপস্থিতি ও
              উত্তেজনা দিন দিন বেড়েই
              চলেছে।
            </p>
          </div>
        </motion.div>

        {/* News Grid */}

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {newsData.map(
            (news, index) => (
              <motion.div
                key={news.id}
                initial={{
                  opacity: 0,
                  y: 40,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.5,
                  delay:
                    index * 0.1,
                }}
                className="overflow-hidden transition-all duration-300 border rounded-3xl border-cyan-400/10 bg-[#071120] hover:border-cyan-400/30 hover:shadow-[0_0_30px_rgba(34,211,238,0.12)]"
              >

                <img
                  src={news.image}
                  alt=""
                  className="object-cover w-full h-52"
                />

                <div className="p-6">

                  <div className="flex items-center gap-2 mb-3 text-sm text-cyan-400">

                    <Calendar size={15} />

                    {news.date}
                  </div>

                  <h3 className="mb-3 text-xl font-bold text-white">
                    {news.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-gray-400">
                    {
                      news.description
                    }
                  </p>

                  <button className="flex items-center gap-2 mt-5 font-semibold text-cyan-400">

                    Read More

                    <ArrowRight
                      size={16}
                    />
                  </button>
                </div>
              </motion.div>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default News;