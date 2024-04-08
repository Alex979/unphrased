interface HintProps {
  emojis: string;
}

export default function Hint({ emojis }: HintProps) {
  return (
    <div className="rounded-lg m-4">
      <div className="bg-indigo-100 dark:bg-indigo-950 border-x border-t rounded-t-lg border-indigo-300 dark:border-indigo-600 text-center">
        <p className="text-sm font-bold">CLUE</p>
      </div>
      <div className="p-1 border-x border-b rounded-b-lg dark:border-zinc-600">
        <p className="text-3xl">{emojis}</p>
      </div>
    </div>
  );
}
