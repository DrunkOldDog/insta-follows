import React from "react";
import { InstagramDashboard } from "@/features";

export default function Page() {
  return (
    <div className="py-24">
      <h1 className="text-4xl font-bold mb-4">InstaFollows</h1>
      <p className="text-gray-500 mb-10">
        Check who doesn't follow you back on Instagram.
      </p>
      <InstagramDashboard />
    </div>
  );
}
