import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/app/supabase/types";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

const responseHeaders = { "Cache-Control": "no-store" };

export async function GET(request: Request) {
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret) {
    return Response.json(
      { error: "Keep-alive is not configured." },
      { status: 500, headers: responseHeaders }
    );
  }

  if (request.headers.get("authorization") !== `Bearer ${cronSecret}`) {
    return Response.json(
      { error: "Unauthorized." },
      { status: 401, headers: responseHeaders }
    );
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return Response.json(
      { error: "Keep-alive is not configured." },
      { status: 500, headers: responseHeaders }
    );
  }

  try {
    const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: {
        fetch: (input, init) => fetch(input, { ...init, cache: "no-store" }),
      },
    });

    // Supabase recommends a few database requests each day for free projects.
    for (let attempt = 0; attempt < 3; attempt++) {
      const { error } = await supabase
        .from("puzzles")
        .select("id")
        .limit(1)
        .abortSignal(AbortSignal.timeout(5_000));

      if (error) {
        throw new Error("Database request failed.");
      }
    }

    return Response.json({ ok: true }, { headers: responseHeaders });
  } catch {
    console.error("Supabase keep-alive failed.");
    return Response.json(
      { error: "Database keep-alive failed." },
      { status: 503, headers: responseHeaders }
    );
  }
}
