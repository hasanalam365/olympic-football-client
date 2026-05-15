// Stats.jsx

import React, { useEffect, useState } from "react";
import {
  Trophy,
  Swords,
  Goal,
  Users,
} from "lucide-react";

import { motion } from "framer-motion";

const statsData = [
  {
    id: 1,
    icon: Trophy,
    value: 8,
    label: "Teams",
    color: "text-cyan-400",
    bg: "bg-cyan-400/10",
  },
  {
    id: 2,
    icon: Swords,
    value: 6,
    label: "Matches",
    color: "text-purple-400",
    bg: "bg-purple-400/10",
  },
  {
    id: 3,
    icon: Goal,
    value: 21,
    label: "Goals",
    color: "text-yellow-400",
    bg: "bg-yellow-400/10",
  },
  {
    id: 4,
    icon: Users,
    value: 10,
    label: "Players",
    color: "text-green-400",
    bg: "bg-green-400/10",
  },
];

/* COUNT ANIMATION */
const Counter = ({ value }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;

    const duration = 2000;
    const increment = value / (duration / 16);

    const timer = setInterval(() => {
      start += increment;

      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  return <span>{count}</span>;
};

const Stats = () => {
  return (
    <section className="bg-[#030B18] py-20 px-6">

      <div className="mx-auto max-w-7xl">

        {/* GRID */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {statsData.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                }}
                viewport={{ once: true }}
                className="relative overflow-hidden border rounded-3xl border-cyan-400/10 bg-[#071120] p-10 group hover:border-cyan-400/30 transition-all duration-500"
              >

                {/* GLOW */}
                <div className="absolute top-0 right-0 transition-all duration-500 rounded-full opacity-0 w-28 h-28 bg-cyan-400/10 blur-3xl group-hover:opacity-100" />

                {/* ICON */}
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center ${item.bg} mx-auto`}
                >
                  <Icon
                    size={24}
                    className={item.color}
                    strokeWidth={2.3}
                  />
                </div>

                {/* NUMBER */}
                <h2 className="mt-6 text-5xl font-extrabold tracking-tight text-center text-white">

                  <Counter value={item.value} />
                </h2>

                {/* LABEL */}
                <p className="mt-3 text-sm font-medium tracking-[3px] text-center uppercase text-gray-500">
                  {item.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Stats;