import { FollowStats } from "../FollowStats";

interface StatsSectionProps {
  previousCreatedAt: string;
  latestCreatedAt: string;
  followersDifference: number;
  followingDifference: number;
}

export default function StatsSectionComponent({
  previousCreatedAt,
  latestCreatedAt,
  followersDifference,
  followingDifference,
}: StatsSectionProps) {
  const getDateString = (date: string) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="mb-8 p-6 bg-gray-900/50 backdrop-blur-sm rounded-lg border border-gray-700/50">
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-2 text-sm">
          <h3 className="text-md font-semibold text-white mb-1">
            Changes Summary
          </h3>

          <p className="text-gray-400">
            Showing changes between {getDateString(previousCreatedAt)} and{" "}
            {getDateString(latestCreatedAt)}
          </p>
        </div>

        <FollowStats
          label="Followers"
          followersDifference={followersDifference}
        />

        <FollowStats
          label="Following"
          followersDifference={followingDifference}
        />
      </div>
    </div>
  );
}
