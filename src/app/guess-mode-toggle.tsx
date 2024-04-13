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
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    // Blur the button to prevent focus outline from sticking around, only when it was a mouse click.
    if (event.detail !== 0) {
      event.currentTarget.blur();
    }

    if (onClick) {
      onClick();
    }
  };

  // Don't allow "Enter" key to trigger clicks, since this is the submit key.
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  return (
    <button
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={`rounded-full w-full max-w-80 ${className}`}
    >
      <div className={`flex items-center`}>
        <div
          className={`w-1/2 flex items-center justify-center px-6 py-1.5 rounded-l-full border-t border-b border-l ${
            guessingMode === GuessingMode.Individual
              ? "border-r border-indigo-600 dark:border-indigo-400 bg-indigo-50 dark:bg-indigo-950 font-semibold text-indigo-600 dark:text-indigo-400"
              : "border-gray-400 dark:border-zinc-400 text-gray-600 dark:text-zinc-300"
          } ${finalGuess ? "opacity-50" : ""}`}
        >
          {"Guess letters"}
        </div>
        <div
          className={`w-1/2 px-6 py-1.5 rounded-r-full border-t border-b border-r ${
            guessingMode === GuessingMode.Full
              ? "border-l border-pink-600 dark:border-pink-300 bg-pink-50 dark:bg-pink-950 font-semibold text-pink-600 dark:text-pink-300"
              : "border-gray-300 dark:border-zinc-400 text-gray-600 dark:text-zinc-300"
          }`}
        >
          {"Guess phrase"}
        </div>
      </div>
    </button>
  );
}
