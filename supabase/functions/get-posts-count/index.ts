import { createClient } from "https://esm.sh/@supabase/supabase-js@2.42.3";
import { corsHeaders } from "../_shared/cors.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? "",
  );

  const { count } = await supabaseClient.from("post").select("*", {
    count: "exact",
  });

  return new Response(JSON.stringify(count), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
