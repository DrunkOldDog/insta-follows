'use client';

import { motion } from "motion/react";

export default function AnimatedBackgroundLayout() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Animated geometric shapes */}
      <motion.div
        className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-purple-600/10 to-pink-600/10 rounded-full blur-xl"
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-blue-600/10 to-cyan-600/10 rounded-full blur-xl"
        animate={{
          x: [0, -80, 0],
          y: [0, 60, 0],
          scale: [1, 0.8, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-40 left-1/4 w-40 h-40 bg-gradient-to-br from-green-600/10 to-emerald-600/10 rounded-full blur-xl"
        animate={{
          x: [0, 120, 0],
          y: [0, -80, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-20 right-1/3 w-28 h-28 bg-gradient-to-br from-orange-600/10 to-red-600/10 rounded-full blur-xl"
        animate={{
          x: [0, -60, 0],
          y: [0, 40, 0],
          scale: [1, 0.9, 1],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Floating geometric shapes */}
      <motion.div
        className="absolute top-1/3 left-1/2 w-16 h-16 bg-gradient-to-br from-indigo-600/15 to-purple-600/15 rotate-45"
        animate={{
          rotate: [0, 360],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.div
        className="absolute bottom-1/3 right-1/4 w-12 h-12 bg-gradient-to-br from-pink-600/15 to-rose-600/15 rotate-45"
        animate={{
          rotate: [360, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}
