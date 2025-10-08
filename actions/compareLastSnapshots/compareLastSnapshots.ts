"use server";

import { createClient } from "@/lib/supabase/server";
import type { Tables } from "@/lib/supabase/database.types";

type Snapshot = Tables<"snapshots">;

export const compareLastSnapshots = async () => {
  const supabase = await createClient();

  try {
    // Get the current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      throw new Error("User not authenticated");
    }

    // Get the last two snapshots for the user, ordered by created_at descending
    const { data: snapshots, error: snapshotsError } = await supabase
      .from("snapshots")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(2);

    if (snapshotsError) {
      throw new Error(`Failed to fetch snapshots: ${snapshotsError.message}`);
    }

    if (!snapshots || snapshots.length === 0) {
      return {
        success: true,
        snapshots: [],
        message: "No snapshots found for this user",
      };
    }

    if (snapshots.length === 1) {
      return {
        success: true,
        snapshots: [snapshots[0]],
        message: "Only one snapshot found",
        differences: null,
      };
    }

    // Calculate differences between the two snapshots
    const latestSnapshot = snapshots[0];
    const previousSnapshot = snapshots[1];

    // Calculate follower/following count differences
    const followersDifference =
      (latestSnapshot.followers_count || 0) -
      (previousSnapshot.followers_count || 0);
    const followingDifference =
      (latestSnapshot.following_count || 0) -
      (previousSnapshot.following_count || 0);

    // Calculate non-followers differences
    const latestNonFollowers = latestSnapshot.non_followers_snapshot || [];
    const previousNonFollowers = previousSnapshot.non_followers_snapshot || [];

    // Find new non-followers (in latest but not in previous)
    const newNonFollowers = latestNonFollowers.filter(
      (username) => !previousNonFollowers.includes(username)
    );

    return {
      success: true,
      data: {
        followersDifference,
        followingDifference,
        newNonFollowers,
        latestSnapshot,
        previousSnapshot,
      },
    };
  } catch (error) {
    console.error("Error comparing last snapshots:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};
