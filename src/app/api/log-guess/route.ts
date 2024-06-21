import { createClient } from "@supabase/supabase-js";
import { Database } from "@/app/supabase/types";
import { NextRequest } from "next/server";
import {
  LogGuessRequest,
  LogStatsRequest,
  isLogGuessRequest,
  isLogStatsRequest,
} from "@/app/types";

export const runtime = "edge";
export const preferredRegion = ["sfo1"];

function validateRequest(data: LogGuessRequest) {
  if (
    data.fingerprint.length === 0 ||
    data.puzzleId.length === 0 ||
    data.guess.length === 0
  ) {
    return false;
  }

  return true;
}

export async function POST(request: NextRequest) {
  if (process.env.NODE_ENV !== "production") {
    return Response.json(
      { error: "Not logging guesses during development." },
      { status: 500 }
    );
  }

  const supabaseAdmin = createClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const data = await request.json();

  if (!isLogGuessRequest(data) || !validateRequest(data)) {
    return Response.json({ error: "Invalid arguments." }, { status: 400 });
  }

  const { error } = await supabaseAdmin.from("guess_logs").insert({
    fingerprint: data.fingerprint,
    puzzle_id: data.puzzleId,
    guess: data.guess,
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
