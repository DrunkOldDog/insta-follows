import type { UserMetadata } from "@supabase/supabase-js";

export const getAvatarInitials = (userMetadata: UserMetadata) => {
  if (userMetadata.name) {
    return userMetadata.name
      .split(" ")
      .map((n: string) => n[0])
      .join("");
  }

  if (userMetadata.email) {
    const emailUsername = userMetadata.email.split("@")[0];
    
    // Check if username has a dot separator
    if (emailUsername.includes(".")) {
      const parts = emailUsername.split(".");
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    
    // If no dot, return first two letters
    return emailUsername.substring(0, 2).toUpperCase();
  }

  return "";
};
