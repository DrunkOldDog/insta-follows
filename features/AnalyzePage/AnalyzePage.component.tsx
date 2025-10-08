"use client";

import { getNonFollowers, saveResultsSnapshot } from "@/actions";
import { Alert, Dropzone, FollowersReport } from "@/components/shared";
import { MotionButton } from "@/components/shared/MotionButton";
import { MotionSection } from "@/components/shared/MotionSection";
import { Spinner } from "@/components/ui";
import { AnimatePresence } from "motion/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import type { NonFollowersResult } from "@/types";
import type { User } from "@supabase/supabase-js";

enum AnalyzeStepEnum {
  Followers,
  Following,
  Results,
}

interface AnalyzePageProps {
  user: User | null;
}

export default function AnalyzePageComponent({ user }: AnalyzePageProps) {
  const [step, setStep] = useState(AnalyzeStepEnum.Followers);
  const [followersFile, setFollowersFile] = useState<File | null>(null);
  const [followingFile, setFollowingFile] = useState<File | null>(null);
  const [results, setResults] = useState<NonFollowersResult | null>(null);
  const [loading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleFollowersFile = (file: File) => {
    if (!file) return; // happening when having an error

    setFollowersFile(file);
    setStep(AnalyzeStepEnum.Following);
  };

  const handleFollowingFile = (file: File) => {
    if (!file) return; // happening when having an error
    void onGetResults(file);
  };

  const onPrevStep = () => {
    setStep((step - 1) as AnalyzeStepEnum);
  };

  const onStartOver = () => {
    setStep(AnalyzeStepEnum.Followers);
    setResults(null);
    setFollowersFile(null);
  };

  const onGetResults = async (followingFile: File) => {
    const formData = new FormData();
    formData.append("followers", followersFile!);
    formData.append("following", followingFile!);

    const results = await getNonFollowers(formData);
    setResults(results);
    setFollowingFile(followingFile);
    setStep(AnalyzeStepEnum.Results);
  };

  const handleSaveResults = async () => {
    setIsLoading(true);
    const result = await saveResultsSnapshot(
      followersFile!,
      followingFile!,
      results!
    );
    setIsLoading(false);

    if (result.success) {
      router.push("/compare");
    } else {
      console.error(result.error);
    }
  };

  return (
    <section className="py-24 pb-48">
      <div className="container mx-auto px-6 min-h-[480px]">
        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            {/* Step 1 */}
            {step === AnalyzeStepEnum.Followers && (
              <MotionSection
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
              </MotionSection>
            )}

            {/* Step 2 */}
            {step === AnalyzeStepEnum.Following && (
              <MotionSection
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

                <MotionButton
                  size="lg"
                  variant="outline"
                  onClick={onPrevStep}
                  className="mt-8 float-right"
                >
                  Back
                </MotionButton>
              </MotionSection>
            )}

            {/* Step 3 */}
            {step === AnalyzeStepEnum.Results && (
              <MotionSection
                key="step-3"
                step={3}
                title="Analysis Results"
                description="Your analysis is complete. Here are the results of your Instagram follower analysis."
                className="space-y-4"
              >
                <FollowersReport nonFollowers={results?.nonFollowers || []} />

                {!user && (
                  <Alert variant="warning">
                    <p className="text-sm">
                      <span className="font-medium">Sign in required:</span> You
                      need to be logged in to save your results and compare them
                      later.
                    </p>
                  </Alert>
                )}

                <div className="flex gap-2 justify-end">
                  <MotionButton
                    size="lg"
                    variant="outline"
                    onClick={onStartOver}
                  >
                    Start Over
                  </MotionButton>

                  <MotionButton
                    size="lg"
                    variant="fancy"
                    onClick={handleSaveResults}
                    disabled={!user || loading}
                    title={!user ? "Please log in to save your results" : ""}
                  >
                    {loading && <Spinner />}
                    Save Results
                  </MotionButton>
                </div>
              </MotionSection>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
