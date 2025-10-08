"use client";

import { compareLastSnapshots } from "@/actions";
import { Alert, FollowersReport } from "@/components/shared";
import { MotionSection } from "@/components/shared/MotionSection";
import useSWR from "swr";
import { StatsSection } from "./components";

export default function ComparePageComponent() {
  const { data, error, isLoading } = useSWR(
    "compareLastSnapshots",
    compareLastSnapshots
  );

  if (error) {
    return (
      <section className="py-24 pb-48">
        <div className="container mx-auto px-6 min-h-[480px]">
          <Alert variant="danger" className="flex gap-3 max-w-3xl mx-auto">
            <h3 className="text-sm font-semibold">
              There was an error on your request.
            </h3>
            <p className="text-sm">
              {error.message} Please try again later or contact support (me).
            </p>
          </Alert>
        </div>
      </section>
    );
  }

  if (isLoading || !data) {
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

  const {
    latestSnapshot,
    previousSnapshot,
    followersDifference,
    followingDifference,
    newNonFollowers,
  } = data;

  return (
    <section className="py-24 pb-48">
      <div className="container mx-auto px-6 min-h-[480px]">
        <div className="max-w-3xl mx-auto">
          <MotionSection
            title="Snapshot Comparison"
            description="Compare your latest Instagram data with the previous snapshot."
          >
            {/* Stats Section */}
            {previousSnapshot && (
              <StatsSection
                previousCreatedAt={previousSnapshot!.created_at}
                latestCreatedAt={latestSnapshot.created_at}
                followersDifference={followersDifference}
                followingDifference={followingDifference}
              />
            )}

            {!previousSnapshot && (
              <Alert variant="warning">
                <h3 className="text-sm font-semibold">
                  You must upload two reports to compare your analytics.
                </h3>
                <p className="text-sm">
                  The next time you run a new analysis, you will be able to
                  compare your followers and following counts.
                </p>
              </Alert>
            )}

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
