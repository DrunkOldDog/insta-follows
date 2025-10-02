"use client";

import { getNonFollowers } from "@/actions";
import { Dropzone } from "@/components/shared";
import { MotionButton } from "@/components/ui";
import { FollowersReport } from "@/features/InstagramDashboard/components";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function AnalyzePage() {
  const [step, setStep] = useState(1);
  const [followersFile, setFollowersFile] = useState<File | null>(null);
  const [results, setResults] = useState<string[]>([]);

  const variants = {
    initial: { opacity: 0, y: 100 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -100 },
    transition: { duration: 0.6, ease: "easeInOut" as const },
  };

  const handleFollowersFile = (file: File) => {
    setFollowersFile(file);
    setStep(2);
  };

  const handleFollowingFile = (file: File) => {
    onGetResults(file);
    setStep(3);
  };

  const onPrevStep = () => {
    setStep(step - 1);
  };

  const onStartOver = () => {
    setStep(1);
    setResults([]);
    setFollowersFile(null);
  };

  const onGetResults = async (followingFile: File) => {
    const formData = new FormData();
    formData.append("followers", followersFile!);
    formData.append("following", followingFile!);
    const results = await getNonFollowers(formData);
    setResults(results);
    setStep(3);
  };

  return (
    <section className="py-24 pb-48">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            {/* Step 1 */}
            {step === 1 && (
              <motion.div
                key="step-1"
                className={`flex flex-col justify-center`}
                initial={variants.initial}
                animate={variants.animate}
                exit={variants.exit}
                transition={variants.transition}
              >
                <div className="mb-8">
                  <h1 className="text-2xl font-bold text-gray-500/60">
                    Step 01
                  </h1>
                  <h2 className="text-4xl font-bold text-white mb-3">
                    Upload Your Followers Data
                  </h2>
                  <p className="text-gray-400">
                    Upload your Instagram followers file to get started with the
                    analysis.
                  </p>
                </div>

                <Dropzone
                  name="followers"
                  accept={{
                    "text/html": [".html", ".htm"],
                    "application/json": [".json"],
                  }}
                  onFilesSelected={(files) => handleFollowersFile(files[0])}
                />
              </motion.div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <motion.div
                key="step-2"
                className={`flex flex-col justify-center`}
                initial={variants.initial}
                animate={variants.animate}
                exit={variants.exit}
                transition={variants.transition}
              >
                <div className="mb-8">
                  <h1 className="text-2xl font-bold text-gray-500/60">
                    Step 02
                  </h1>
                  <h2 className="text-4xl font-bold text-white mb-3">
                    Update Your Following Data
                  </h2>
                  <p className="text-gray-400">
                    Upload your Instagram following file to get started with the
                    analysis.
                  </p>
                </div>

                <Dropzone
                  name="following"
                  accept={{
                    "text/html": [".html", ".htm"],
                    "application/json": [".json"],
                  }}
                  onFilesSelected={(files) => handleFollowingFile(files[0])}
                />

                <MotionButton size="lg" onClick={onPrevStep} className="mt-8">
                  Back
                </MotionButton>
              </motion.div>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <motion.div
                key="step-3"
                className={`flex flex-col justify-center`}
                initial={variants.initial}
                animate={variants.animate}
                exit={variants.exit}
                transition={variants.transition}
              >
                <div className="mb-2">
                  <h1 className="text-2xl font-bold text-gray-500/60">
                    Step 03
                  </h1>
                  <h2 className="text-4xl font-bold text-white mb-3">
                    Analysis Results
                  </h2>
                  <p className="text-gray-400">
                    Your analysis is complete. Here are the results of your
                    Instagram follower analysis.
                  </p>
                </div>

                <FollowersReport nonFollowers={results} />

                <div className="mt-8 flex w-full justify-between">
                  <MotionButton size="lg" onClick={onStartOver}>
                    Start Over
                  </MotionButton>

                  <MotionButton size="lg">Save Results</MotionButton>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
