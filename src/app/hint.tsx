interface HintProps {
  emojis: string;
}

export default function Hint({ emojis }: HintProps) {
  return (
    <div className="border rounded-lg overflow-hidden m-4">
      <div className="bg-indigo-300 text-center">
        <p className="text-sm font-bold">CLUE</p>
      </div>
      <div className="p-1">
        <p className="text-3xl">{emojis}</p>
      </div>
    </div>
  );
}
