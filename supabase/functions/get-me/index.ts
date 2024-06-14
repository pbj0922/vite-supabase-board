import { createClient } from "https://esm.sh/@supabase/supabase-js@2.42.3";
import { corsHeaders } from "../_shared/cors.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const authHeader = req.headers.get("Authorization")!;

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? "",
    { global: { headers: { Authorization: authHeader } } },
  );

  const { data: { user } } = await supabaseClient.auth.getUser();

  const { data: existProfileData } = await supabaseClient.from("profile")
    .select().eq(
      "id",
      user?.id,
    ).single();

  if (existProfileData) {
    return new Response(JSON.stringify(existProfileData), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } else {
    const { data: newProfileData } = await supabaseClient.from("profile")
      .insert({
        id: user?.id,
      }).select().single();

    return new Response(JSON.stringify(newProfileData), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
