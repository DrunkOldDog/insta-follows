"use client";

import { motion } from "motion/react";
import { Github, Coffee } from "lucide-react";
import { MotionButton } from "@/components/ui";
import Link from "next/link";

export default function FooterComponent() {
  return (
    <footer className="py-14 bg-gradient-to-b from-black/20 to-black/40">
      <div className="container mx-auto px-6 relative z-10">
        {/* Main content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-8"
        >
          {/* App branding */}
          <div className="space-y-2">
            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              Instafollows
            </h3>
            <p className="text-gray-400 max-w-md mx-auto">
              Find the assholes that don't follow you back on Instagram.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="https://github.com/DrunkOldDog/insta-follows"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MotionButton
                variant="outline"
                className="group flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github className="w-5 h-5 text-gray-400" />
                <span className="text-gray-300">View on GitHub</span>
              </MotionButton>
            </Link>

            <Link
              href="https://buymeacoffee.com/juani"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MotionButton
                className="group flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Coffee className="w-5 h-5" />
                <span>Buy me a coffee</span>
              </MotionButton>
            </Link>
          </div>

          {/* Made with love section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="pt-8 border-t border-white/10"
          >
            <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
              <span>Made with</span>
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
              >
                ❤️
              </motion.span>
              <span>
                by{" "}
                <Link
                  href="https://linkedin.com/in/juanireyes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-purple-400"
                >
                  Juani Reyes
                </Link>
              </span>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}
