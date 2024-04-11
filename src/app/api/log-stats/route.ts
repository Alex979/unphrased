import { createClient } from "@supabase/supabase-js";
import { Database } from "@/app/supabase/types";
import { NextRequest } from "next/server";
import { LogStatsRequest, isLogStatsRequest } from "@/app/types";

function validateRequest(data: LogStatsRequest) {
  if (data.solved && (!data.numGuesses || data.numGuesses < 1 || data.numGuesses > 8)) {
    return false;
  }

  return true
}

export async function POST(request: NextRequest) {
  const supabaseAdmin = createClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const data = await request.json();

  if (!isLogStatsRequest(data) || !validateRequest(data)) {
    return Response.json({ error: 'Invalid arguments.' }, { status: 400 });
  }

  const { error } = await supabaseAdmin.from("stats").insert({
    fingerprint: data.fingerprint,
    puzzle_id: data.puzzleId,
    solved: data.solved,
    num_guesses: data.numGuesses || null,
  });

  if (error) {
    console.error(error);
    return Response.json(
      { error: "An internal error occurred." },
      { status: 500 }
    );
  }

  return Response.json({ success: true });
}
