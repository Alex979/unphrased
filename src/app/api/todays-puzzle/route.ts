import { createClient } from "@/app/supabase/server";
import { NextRequest } from "next/server";
import { isTodaysPuzzleRequest } from "@/app/types";

export const runtime = "edge";
export const preferredRegion = ["sfo1"];

function getCurrentDateForTimeZone(timeZone: string) {
  const options: Intl.DateTimeFormatOptions = {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  const formatter = new Intl.DateTimeFormat("en-CA", options); // Using Canadian English to favor YYYY-MM-DD format
  const currentDate = formatter.format(new Date());

  return currentDate; // Returns the date in 'YYYY-MM-DD' format
}

export async function POST(request: NextRequest) {
  const supabase = createClient();

  const requestData = await request.json();

  if (!isTodaysPuzzleRequest(requestData)) {
    return Response.json({ error: "Invalid arguments." }, { status: 400 });
  }

  let usersDate: string = "";
  try {
    usersDate = getCurrentDateForTimeZone(requestData.timeZone);
  } catch (error) {
    console.error(error);
    usersDate = getCurrentDateForTimeZone("America/Los_Angeles");
  }

  const { data, error } = await supabase
    .from("numbered_puzzles")
    .select()
    .eq("date", usersDate)
    .single();

  if (error || !data) {
    if (error) console.error(error);
    return Response.json(
      { error: "An internal error occurred." },
      { status: 500 }
    );
  }

  return Response.json(data);
}
