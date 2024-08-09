import Home from "@/app/page";
import { Database } from "@/app/supabase/types";
import { createClient } from "@supabase/supabase-js";

export default function PuzzleArchive({ params }: { params: { id: string } }) {
  return <Home requestedId={params.id} />;
}

export async function generateStaticParams() {
  const supabaseAdmin = createClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data, error } = await supabaseAdmin.from("puzzles").select();
  if (error) {
    throw error;
  }

  return data.map((puzzle) => ({
    id: puzzle.id,
  }));
}
