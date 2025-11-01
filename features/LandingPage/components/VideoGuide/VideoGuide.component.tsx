"use client";

import { motion } from "motion/react";
import Link from "next/link";
import ReactPlayer from "react-player";
import { PlayCircle, BookOpen, UploadCloud } from "lucide-react";

export default function VideoGuideComponent() {
  return (
    <section className="py-24 bg-gradient-to-b">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
            Learn how to use the app
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Follow the step-by-step walkthrough video or use the official
            Instagram help guide.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12 max-w-7xl mx-auto items-start">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="h-full md:col-span-1"
          >
            <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-4">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors duration-300 group">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <PlayCircle className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div>
                    <h4 className="text-base font-semibold mb-1">
                      Option 1 — Watch the video
                    </h4>
                    <p className="text-sm text-gray-400">
                      Quick overview of how to export your Instagram data and
                      analyze it here.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors duration-300 group">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <BookOpen className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div>
                    <h4 className="text-base font-semibold mb-1">
                      Option 2 — Follow the guide
                    </h4>
                    <p className="text-sm text-gray-400">
                      Prefer reading? Use Instagram's official documentation{" "}
                      <a
                        href="https://help.instagram.com/181231772500920"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-300 underline hover:text-indigo-200"
                      >
                        here
                      </a>
                      .
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors duration-300 group">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <UploadCloud className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div>
                    <h4 className="text-base font-semibold mb-1.5">
                      Step 2 — Analyze your files
                    </h4>
                    <p className="text-sm text-gray-400 mb-2.5">
                      Upload your Followers and Following JSON files to get your
                      non-followers report.
                    </p>
                    <Link
                      href="/analyze"
                      className="inline-flex items-center rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 text-xs font-medium transition-colors"
                    >
                      Go to Analyze
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 text-xs text-gray-400">
              Already have your files? Jump straight to{" "}
              <Link
                href="/analyze"
                className="text-indigo-300 underline hover:text-indigo-200"
              >
                Analyze
              </Link>
              .
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-full md:col-span-2"
          >
            <div className="relative w-full overflow-hidden rounded-2xl aspect-video bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 shadow-2xl shadow-black/50 group hover:shadow-indigo-500/20 transition-shadow duration-300">
              <div className="relative w-full h-full overflow-hidden rounded-2xl">
                <ReactPlayer
                  src="https://www.youtube.com/watch?v=eOd1rDPZvtk"
                  height="100%"
                  width="100%"
                  controls
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
