"use server";

import { createClient } from "@/lib/supabase/server";

import type { NonFollowersResult } from "@/types";

// Helper function to upload file to storage
const uploadFile = async (file: File, fileType: string) => {
  const supabase = await createClient();

  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const fileName = `${fileType}-${timestamp}.${file.name.split(".").pop()}`;

  const { data, error } = await supabase.storage
    .from("snapshots_bucket")
    .upload(fileName, file);

  if (error) {
    throw new Error(`Failed to upload ${fileType} file: ${error.message}`);
  }

  return data;
};

export const saveResultsSnapshot = async (
  followersFile: File,
  followingFile: File,
  parsedResults: NonFollowersResult
) => {
  const supabase = await createClient();

  try {
    if (!followersFile || !followingFile) {
      throw new Error("Both followers and following files are required");
    }

    // Upload both files to Supabase storage
    const [followersUploadData, followingUploadData] = await Promise.all([
      uploadFile(followersFile, "followers"),
      uploadFile(followingFile, "following"),
    ]);

    // Get the current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      throw new Error("User not authenticated");
    }

    // Insert snapshot record into the database
    const { data: snapshotData, error: snapshotError } = await supabase
      .from("snapshots")
      .insert({
        non_followers_snapshot: parsedResults.nonFollowers,
        followers_file_id: followersUploadData.id,
        following_file_id: followingUploadData.id,
        user_id: user.id,
        followers_count: parsedResults.followersCount,
        following_count: parsedResults.followingCount,
      })
      .select()
      .single();

    if (snapshotError) {
      throw new Error(`Failed to save snapshot: ${snapshotError.message}`);
    }

    return {
      success: true,
      snapshotId: snapshotData.id,
      followersFileId: followersUploadData.path,
      followingFileId: followingUploadData.path,
    };
  } catch (error) {
    console.error("Error saving results snapshot:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};
