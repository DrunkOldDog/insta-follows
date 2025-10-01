"use client";

import { useState } from "react";
import { FollowersReport, UploadForm } from "./components";

export default function InstagramDashboardComponent() {
  const [nonFollowers, setNonFollowers] = useState<string[]>([]);

  const handleNonFollowersFound = (data: string[]) => {
    setNonFollowers(data);
  };

  return (
    <div>
      <UploadForm onNonFollowersFound={handleNonFollowersFound} />
      {nonFollowers.length > 0 && (
        <FollowersReport nonFollowers={nonFollowers} />
      )}
    </div>
  );
}
