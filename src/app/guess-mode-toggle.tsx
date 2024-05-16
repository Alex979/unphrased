import { GuessingMode } from "./types";

interface GuessModeToggleProps {
  className?: string;
  guessingMode: GuessingMode;
  setGuessingMode?: (mode: GuessingMode) => void;
  finalGuess: boolean;
}

export default function GuessModeToggle({
  className,
  guessingMode,
  setGuessingMode,
  finalGuess,
}: GuessModeToggleProps) {
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    mode: GuessingMode
  ) => {
    // Blur the button to prevent focus outline from sticking around, only when it was a mouse click.
    if (event.detail !== 0) {
      event.currentTarget.blur();
    }

    if (setGuessingMode) {
      setGuessingMode(mode);
    }
  };

  // Don't allow "Enter" key to trigger clicks, since this is the submit key.
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  return (
    <div
      className={`rounded-full w-full max-w-80 bg-gray-200 dark:bg-zinc-700 font-semibold overflow-hidden ${className}`}
    >
      <button
        onClick={(e) => handleClick(e, GuessingMode.Individual)}
        onKeyDown={handleKeyDown}
        className={`w-1/2 rounded-full px-2 py-2 ${
          guessingMode === GuessingMode.Individual
            ? "bg-indigo-500 text-white shadow-[0_0_6px_-1px_rgba(0,0,0,0.2)]"
            : ""
        }`}
      >
        Guess letters
      </button>
      <button
        onClick={(e) => handleClick(e, GuessingMode.Full)}
        onKeyDown={handleKeyDown}
        className={`w-1/2 rounded-full px-2 py-2 ${
          guessingMode === GuessingMode.Full
            ? "bg-pink-500 text-white shadow-[0_0_6px_-1px_rgba(0,0,0,0.2)]"
            : ""
        }`}
      >
        Guess phrase
      </button>
    </div>
  );
}
