import { GuessingMode } from "./types";

interface HintProps {
  emojis: string;
  guessingMode: GuessingMode;
}

export default function Hint({ emojis, guessingMode }: HintProps) {
  const colorClass =
    guessingMode === GuessingMode.Individual
      ? `bg-indigo-100 dark:bg-indigo-950 border-indigo-300 dark:border-indigo-600`
      : `bg-pink-100 dark:bg-pink-950 dark:bg-opacity-30 border-pink-300 dark:border-[#a64c74]`;

  return (
    <div className="rounded-lg m-4">
      <div
        className={`${colorClass} border-x border-t rounded-t-lg text-center`}
      >
        <p className="text-sm font-bold">CLUE</p>
      </div>
      <div className="p-1 border-x border-b rounded-b-lg dark:border-zinc-600">
        <p className="text-3xl">{emojis}</p>
      </div>
    </div>
  );
}
