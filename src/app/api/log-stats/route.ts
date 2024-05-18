import { createClient } from "@/app/supabase/server";
import { NextRequest } from "next/server";
import { LogStatsRequest, isLogStatsRequest } from "@/app/types";

export const runtime = 'edge';
export const preferredRegion = ['sfo1'];

function validateRequest(data: LogStatsRequest) {
  if (data.solved && (!data.numGuesses || data.numGuesses < 1 || data.numGuesses > 8)) {
    return false;
  }

  return true
}

export async function POST(request: NextRequest) {
  if (process.env.NODE_ENV !== "production") {
    return Response.json({ error: "Not logging stats during development." }, { status: 500 });
  }

  const supabase = createClient();

  const data = await request.json();

  if (!isLogStatsRequest(data) || !validateRequest(data)) {
    return Response.json({ error: 'Invalid arguments.' }, { status: 400 });
  }

  const { error } = await supabase.from("stats").insert({
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
