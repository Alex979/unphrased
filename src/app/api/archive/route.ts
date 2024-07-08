import { createClient } from "@supabase/supabase-js";
import { Database } from "@/app/supabase/types";
import { NextRequest } from "next/server";
import { isArchiveRequest } from "@/app/types";
import { getCurrentDateForTimeZone } from "../../lib/date-utils";

export const runtime = "edge";
export const preferredRegion = ["sfo1"];

export async function POST(request: NextRequest) {
  const supabaseAdmin = createClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const requestData = await request.json();

  if (!isArchiveRequest(requestData)) {
    return Response.json({ error: "Invalid arguments." }, { status: 400 });
  }

  let usersDate: string = "";
  try {
    usersDate = getCurrentDateForTimeZone(requestData.timeZone);
  } catch (error) {
    console.error(error);
    usersDate = getCurrentDateForTimeZone("America/Los_Angeles");
  }

  const { data, error } = await supabaseAdmin
    .from("puzzles")
    .select()
    .lte("date", usersDate)
    .eq("extract_month", requestData.month)
    .eq("extract_year", requestData.year)
    .order("date", { ascending: true });

  if (error || !data) {
    if (error) console.error(error);
    return Response.json(
      { error: "An internal error occurred." },
      { status: 500 }
    );
  }

  return Response.json(
    data.map((puzzle) => ({
      id: puzzle.id,
      date: puzzle.date,
    }))
  );
}
