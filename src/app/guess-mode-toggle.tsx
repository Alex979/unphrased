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

  const pillPositionStyles =
    guessingMode === GuessingMode.Individual
      ? "animate-switch-letters"
      : "animate-switch-phrase";

  const pillColorStyles =
    guessingMode === GuessingMode.Individual ? "bg-indigo-500" : "bg-pink-500";

  return (
    <div
      className={`relative rounded-full w-full max-w-80 h-10 bg-gray-200 dark:bg-zinc-700 font-semibold overflow-hidden ${className}`}
    >
      <div
        className={`absolute rounded-full inset-y-0 shadow-[0_0_6px_-1px_rgba(0,0,0,0.2)] transition-colors ${pillPositionStyles} ${pillColorStyles}`}
      ></div>
      <button
        onClick={(e) => handleClick(e, GuessingMode.Individual)}
        onKeyDown={handleKeyDown}
        className={`absolute transition-colors inset-y-0 left-0 right-1/2 h-full rounded-full ${
          guessingMode === GuessingMode.Individual ? "text-white" : ""
        } ${finalGuess ? "opacity-50" : ""}`}
      >
        Guess letters
      </button>
      <button
        onClick={(e) => handleClick(e, GuessingMode.Full)}
        onKeyDown={handleKeyDown}
        className={`absolute transition-colors inset-y-0 right-0 left-1/2 h-full rounded-full ${
          guessingMode === GuessingMode.Full ? "text-white" : ""
        }`}
      >
        Guess phrase
      </button>
    </div>
  );
}
