import { cn } from "@/lib/utils";
import { VariantProps } from "class-variance-authority";
import {
  followersReportVariants,
  followersReportTagVariants,
  followersReportCardVariants,
  followersReportDotVariants,
  followersReportTextVariants,
} from "./FollowersReport.variants";

interface FollowersReportProps
  extends VariantProps<typeof followersReportVariants> {
  nonFollowers: string[];
  title?: string;
  showCaptionCount?: boolean;
}

export default function FollowersReportComponent({
  nonFollowers,
  title = "People who don't follow you back",
  showCaptionCount = true,
  color,
}: FollowersReportProps) {
  return (
    <div className={cn(followersReportVariants({ color }))}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-200">{title}</h3>
        <span className={cn(followersReportTagVariants({ color }))}>
          {nonFollowers.length}{" "}
          {nonFollowers.length === 1 ? "person" : "people"}
        </span>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2">
        {nonFollowers.map((username, index) => (
          <div
            key={index}
            className={cn(followersReportCardVariants({ color }))}
          >
            <div className="flex items-center space-x-1.5">
              <div className={cn(followersReportDotVariants({ color }))}></div>
              <span className={cn(followersReportTextVariants({ color }))}>
                {username}
              </span>
            </div>
          </div>
        ))}
      </div>

      {showCaptionCount && (
        <div className="mt-3 text-center">
          <p className={cn(followersReportTextVariants({ color }))}>
            Showing all {nonFollowers.length} non-followers
          </p>
        </div>
      )}
    </div>
  );
}
