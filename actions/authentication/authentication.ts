"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export const signOut = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
};

export const signInWithOpt = async (formData: FormData) => {
  const supabase = await createClient();

  const email = formData.get("login-email") as string;

  if (!email) {
    return { success: false, error: "Email is required" };
  }

  const { error } = await supabase.auth.signInWithOtp({
    email,
  });

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, message: "OTP sent to email" };
};

export const verifyOptCode = async (formData: FormData) => {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const code = formData.get("code") as string;


  const { error } = await supabase.auth.verifyOtp({
    type: "email",
    email,
    token: code,
  });

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/", "layout");
  return { success: true, message: "OTP verified" };
};
