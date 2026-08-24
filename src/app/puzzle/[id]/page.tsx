import Home from "@/app/page";

export default async function PuzzleArchive({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <Home requestedId={id} />;
}
