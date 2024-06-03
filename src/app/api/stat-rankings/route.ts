import { createClient } from "@supabase/supabase-js";
import { Database } from "@/app/supabase/types";
import { NextRequest } from "next/server";
import { isStatRankingsRequest } from "@/app/types";

export const runtime = "edge";
export const preferredRegion = ["sfo1"];

export async function POST(request: NextRequest) {
  const supabaseAdmin = createClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const requestData = await request.json();

  if (!isStatRankingsRequest(requestData)) {
    return Response.json({ error: "Invalid arguments." }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin.rpc("stat_rankings", {
    id: requestData.id,
  });

  if (error || !data) {
    if (error) console.error(error);
    return Response.json(
      { error: "An internal error occurred." },
      { status: 500 }
    );
  }

  return Response.json(data);
}
