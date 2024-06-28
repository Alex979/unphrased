import { createClient } from "@supabase/supabase-js";
import { Database } from "@/app/supabase/types";
import { NextRequest } from "next/server";
import { isPuzzleRequest } from "@/app/types";
import { getCurrentDateForTimeZone } from "../../lib/date-utils";

export const runtime = "edge";
export const preferredRegion = ["sfo1"];

export async function POST(request: NextRequest) {
  const supabaseAdmin = createClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const requestData = await request.json();

  if (!isPuzzleRequest(requestData)) {
    return Response.json({ error: "Invalid arguments." }, { status: 400 });
  }

  let usersDate: string = "";
  try {
    usersDate = getCurrentDateForTimeZone(requestData.timeZone);
  } catch (error) {
    console.error(error);
    usersDate = getCurrentDateForTimeZone("America/Los_Angeles");
  }

  let data, error;
  if (requestData.puzzleId) {
    ({ data, error } = await supabaseAdmin
      .from("numbered_puzzles")
      .select()
      .eq("id", requestData.puzzleId)
      .single());
  } else {
    ({ data, error } = await supabaseAdmin
      .from("numbered_puzzles")
      .select()
      .eq("date", usersDate)
      .single());
  }

  if (error || !data) {
    if (error) console.error(error);
    return Response.json(
      { error: "An internal error occurred." },
      { status: 500 }
    );
  }

  return Response.json(data);
}
