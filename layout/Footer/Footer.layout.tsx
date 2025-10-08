"use client";

import { motion } from "motion/react";
import { Github, Coffee } from "lucide-react";
import { LogoText } from "@/components/shared";
import { MotionButton } from "@/components/shared/MotionButton";
import Link from "next/link";

export default function FooterComponent() {
  return (
    <footer className="py-14 bg-gradient-to-b from-transparent to-black/60">
      <div className="container mx-auto px-6 relative z-10">
        {/* Main content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-8"
        >
          {/* App branding */}
          <div className="space-y-1">
            <LogoText className="text-3xl" />
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
                className="group flex items-center gap-2 text-gray-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github className="w-5 h-5" />
                <span>View on GitHub</span>
              </MotionButton>
            </Link>

            {/* TODO: Add buy me a coffee link when project is finished */}
            {/* <Link
              href="https://buymeacoffee.com/juani"
              target="_blank"
              rel="noopener noreferrer"
            /> */}

            <MotionButton
              disabled
              variant="fancy"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Coffee className="w-5 h-5" />
              <span>Buy me a coffee</span>
            </MotionButton>
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
