import Home from "@/app/page";

export default function PuzzleArchive({ params }: { params: { id: string } }) {
  return <Home requestedId={params.id} />;
}
