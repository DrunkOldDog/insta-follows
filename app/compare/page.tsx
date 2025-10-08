import { ComparePage } from "@/features";
import { createClient } from "@/lib/supabase/server";

export default async function ComparePageRoute() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <ComparePage user={user} />;
}
