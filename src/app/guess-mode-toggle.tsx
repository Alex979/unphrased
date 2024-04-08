import { GuessingMode } from "./types";

interface GuessModeToggleProps {
  className?: string;
  guessingMode: GuessingMode;
  onClick?: () => void;
  finalGuess: boolean;
}

export default function GuessModeToggle({
  className,
  guessingMode,
  onClick,
  finalGuess,
}: GuessModeToggleProps) {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  return (
    <button
      className={`my-2 ${className}`}
      onClick={onClick}
      onKeyDown={handleKeyDown}
    >
      <div
        className={`w-1/2 inline ${
          finalGuess ? "hidden" : ""
        } px-6 py-2 rounded-l-full border-t border-b border-l ${
          guessingMode === GuessingMode.Individual
            ? "border-r border-indigo-600 dark:border-indigo-400 bg-indigo-50 dark:bg-indigo-950 font-semibold text-indigo-600 dark:text-indigo-400"
            : "border-gray-400 dark:border-zinc-400 text-gray-600 dark:text-zinc-300"
        }`}
      >
        {finalGuess ? "" : "Guess letters"}
      </div>
      <div
        className={`w-1/2 inline px-6 py-2 rounded-r-full ${
          finalGuess ? "rounded-l-full" : ""
        } border-t border-b border-r ${
          guessingMode === GuessingMode.Full
            ? "border-l border-pink-600 dark:border-pink-300 bg-pink-50 dark:bg-pink-950 font-semibold text-pink-600 dark:text-pink-300"
            : "border-gray-300 dark:border-zinc-400 text-gray-600 dark:text-zinc-300"
        }`}
      >
        {finalGuess ? "Final Guess!" : "Guess phrase"}
      </div>
    </button>
  );
}
