import React from "react";
import { motion } from "framer-motion";
import { Trophy } from "lucide-react";

const PageLoader = () => {
  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-[#06131F]">

      {/* Stadium Lights */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-64 h-64 rounded-full top-10 left-10 bg-emerald-500/10 blur-3xl animate-pulse" />
        <div className="absolute w-64 h-64 rounded-full bottom-10 right-10 bg-yellow-500/10 blur-3xl animate-pulse" />

        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      </div>

      <div className="relative z-10 flex flex-col items-center">

        {/* Rotating Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
          }}
          className="border-4 rounded-full w-36 h-36 border-white/10 border-t-yellow-400 border-r-emerald-400"
        />

        {/* Football */}
        <motion.div
          animate={{
            y: [0, -12, 0],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
          }}
          className="absolute text-5xl"
        >
          ⚽
        </motion.div>

        {/* Trophy */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="absolute -top-12"
        >
          <Trophy
            size={30}
            className="text-yellow-400"
          />
        </motion.div>

        {/* Tournament Name */}
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="mt-12 text-3xl font-bold tracking-widest text-white uppercase"
        >
          Olympic Tournament
        </motion.h2>

        {/* Loading Text */}
        <motion.p
          animate={{
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
          className="mt-3 text-sm tracking-[0.4em] text-emerald-400 uppercase"
        >
          Loading......
        </motion.p>

        {/* Dots */}
        <div className="flex gap-2 mt-8">
          {[0, 1, 2].map((dot) => (
            <motion.div
              key={dot}
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 0.7,
                repeat: Infinity,
                delay: dot * 0.2,
              }}
              className="w-3 h-3 bg-yellow-400 rounded-full"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PageLoader;