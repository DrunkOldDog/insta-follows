"use client";

import { compareLastSnapshots } from "@/actions";
import { FollowersReport } from "@/components/shared";
import { MotionSection } from "@/components/shared/MotionSection";
import { useEffect, useState } from "react";
import { StatsSection } from "./components";

import type { User } from "@supabase/supabase-js";

interface ComparePageProps {
  user: User | null;
}

interface CompareData {
  success: boolean;
  data?: {
    followersDifference: number;
    followingDifference: number;
    newNonFollowers: string[];
    latestSnapshot: any;
    previousSnapshot: any;
  };
  error?: string;
}

export default function ComparePageComponent({ user }: ComparePageProps) {
  const [data, setData] = useState<CompareData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await compareLastSnapshots();
        setData(result);
      } catch (error) {
        console.error("Error fetching comparison data:", error);
        setData({
          success: false,
          error:
            error instanceof Error ? error.message : "Unknown error occurred",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <section className="py-24 pb-48">
        <div className="container mx-auto px-6 min-h-[480px]">
          <div className="max-w-3xl mx-auto">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-4 text-gray-400">Loading comparison data...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!data || !data.success || data.error) {
    return (
      <section className="py-24 pb-48">
        <div className="container mx-auto px-6 min-h-[480px]">
          <div className="max-w-3xl mx-auto">
            <div className="text-center text-red-400">
              <p>Error loading comparison data: {data?.error}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!data.data) {
    return (
      <section className="py-24 pb-48">
        <div className="container mx-auto px-6 min-h-[480px]">
          <div className="max-w-3xl mx-auto">
            <div className="text-center text-gray-400">
              <p>No snapshots found. Please analyze your data first.</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const {
    latestSnapshot,
    previousSnapshot,
    followersDifference,
    followingDifference,
    newNonFollowers,
  } = data.data;

  return (
    <section className="py-24 pb-48">
      <div className="container mx-auto px-6 min-h-[480px]">
        <div className="max-w-3xl mx-auto">
          <MotionSection
            title="Snapshot Comparison"
            description="Compare your latest Instagram data with the previous snapshot."
          >
            {/* Stats Section */}
            <StatsSection
              previousCreatedAt={previousSnapshot.created_at}
              latestCreatedAt={latestSnapshot.created_at}
              followersDifference={followersDifference}
              followingDifference={followingDifference}
            />

            {/* Current Non-Followers */}
            <FollowersReport
              nonFollowers={latestSnapshot?.non_followers_snapshot || []}
            />

            {/* New Non-Followers */}
            {newNonFollowers && newNonFollowers.length > 0 && (
              <FollowersReport
                nonFollowers={newNonFollowers}
                color="danger"
                title="New Non-Followers"
                showCaptionCount={false}
              />
            )}
          </MotionSection>
        </div>
      </div>
    </section>
  );
}
