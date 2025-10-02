"use client";

import { getNonFollowers } from "@/actions";
import { Dropzone } from "@/components/shared";
import { MotionButton } from "@/components/ui";
import { FollowersReport } from "@/features/InstagramDashboard/components";
import { AnimatePresence } from "motion/react";
import { useState } from "react";
import { MotionStepCard } from "./components";

export default function AnalyzePageComponent() {
  const [step, setStep] = useState(1);
  const [followersFile, setFollowersFile] = useState<File | null>(null);
  const [results, setResults] = useState<string[]>([]);

  const handleFollowersFile = (file: File) => {
    if (!file) return; // happening when having an error

    setFollowersFile(file);
    setStep(2);
  };

  const handleFollowingFile = (file: File) => {
    if (!file) return; // happening when having an error

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
        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            {/* Step 1 */}
            {step === 1 && (
              <MotionStepCard
                key="step-1"
                step={1}
                title="Upload Your Followers Data"
                description="Upload your Instagram followers file to get started with the analysis."
              >
                <Dropzone
                  name="followers"
                  accept={{
                    "text/html": [".html", ".htm"],
                    "application/json": [".json"],
                  }}
                  onFilesSelected={(files) => handleFollowersFile(files[0])}
                />
              </MotionStepCard>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <MotionStepCard
                key="step-2"
                step={2}
                title="Update Your Following Data"
                description="Upload your Instagram following file to get started with the analysis."
              >
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
              </MotionStepCard>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <MotionStepCard
                key="step-3"
                step={3}
                title="Analysis Results"
                description="Your analysis is complete. Here are the results of your Instagram follower analysis."
              >
                <FollowersReport nonFollowers={results} />

                <div className="mt-8 flex gap-3">
                  <MotionButton
                    size="lg"
                    variant="outline"
                    onClick={onStartOver}
                  >
                    Start Over
                  </MotionButton>

                  <MotionButton size="lg">Save Results</MotionButton>
                </div>
              </MotionStepCard>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
