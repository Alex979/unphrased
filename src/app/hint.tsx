import { GuessingMode } from "./types";

interface HintProps {
  emojis: string;
  guessingMode: GuessingMode;
}

export default function Hint({ emojis, guessingMode }: HintProps) {
  const colorClass =
    guessingMode === GuessingMode.Individual
      ? `bg-indigo-200 dark:bg-indigo-900`
      : `bg-pink-200 dark:bg-pink-900`;

  return (
    <div className="rounded-lg m-4">
      <div
        className={`${colorClass} rounded-t-lg text-center`}
      >
        <p className="text-sm font-bold">CLUE</p>
      </div>
      <div className="p-1 border-x border-b rounded-b-lg dark:border-zinc-600">
        <p className="text-3xl">{emojis}</p>
      </div>
    </div>
  );
}
