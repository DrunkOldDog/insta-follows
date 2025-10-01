"use client";

import { MotionButton } from "@/components/ui";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export default function HeroSectionComponent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <motion.section
      ref={containerRef}
      style={{ y, opacity }}
      className="relative z-10"
    >
      <div className="container mx-auto px-6 py-24 flex items-center justify-center min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-center mb-16 w-full max-w-4xl"
        >
          <motion.h1
            className="text-5xl sm:text-7xl md:text-9xl/28 font-bold mb-8 tracking-tight"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400 mb-4">
              Discover who doesn't follow you back
            </span>
          </motion.h1>

          <motion.p
            className="text-xl text-gray-500 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            Analyze your Instagram connections legally. Find out who's not
            following you back with our secure, privacy-focused tool.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="mb-16"
          >
            <MotionButton
              size="lg"
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105"
              whileHover={{ scale: 1 }}
              whileTap={{ scale: 0.95 }}
            >
              Analyze My Followers
            </MotionButton>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
