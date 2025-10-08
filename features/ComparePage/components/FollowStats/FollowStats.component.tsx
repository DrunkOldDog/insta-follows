interface FollowStatsProps {
  label: string;
  followersDifference: number;
}

export default function FollowStatsComponent({
  label,
  followersDifference,
}: FollowStatsProps) {
  return (
    <div className="flex flex-col p-4 bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-lg border border-gray-700/50">
      <span className="text-gray-400 text-xs">{label}</span>
      <h3
        className={`font-bold text-2xl ${
          followersDifference >= 0 ? "text-green-400" : "text-red-400"
        }`}
      >
        {followersDifference >= 0 ? "+" : ""}
        {followersDifference}
      </h3>
    </div>
  );
}
