interface FollowersReportProps {
  nonFollowers: string[];
}

export default function FollowersReportComponent({
  nonFollowers,
}: FollowersReportProps) {
  return (
    <div className="mt-6 p-4 bg-gray-900/50 backdrop-blur-sm rounded-lg border border-gray-700/50">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-100">
          People who don't follow you back
        </h3>
        <span className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs font-medium rounded-md">
          {nonFollowers.length}{" "}
          {nonFollowers.length === 1 ? "person" : "people"}
        </span>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2">
        {nonFollowers.map((username, index) => (
          <div
            key={index}
            className="group relative bg-gray-800/40 border border-gray-700/30 rounded-md p-2 hover:bg-gray-700/40 transition-all duration-200 hover:scale-105"
          >
            <div className="flex items-center space-x-1.5">
              <div className="w-1.5 h-1.5 bg-gray-500 rounded-full"></div>
              <span className="text-xs font-medium text-gray-200 truncate">
                {username}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 text-center">
        <p className="text-xs text-gray-400">
          Showing all {nonFollowers.length} non-followers
        </p>
      </div>
    </div>
  );
}
