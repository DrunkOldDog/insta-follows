import { AnalyzePage } from "@/features";
import { createClient } from "@/lib/supabase/server";

export default async function AnalyzePageRoute() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <AnalyzePage user={user} />;
}
