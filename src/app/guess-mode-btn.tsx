import { GuessingMode } from "./types";

interface GuessModeButtonProps {
  className?: string;
  guessingMode: GuessingMode;
  onClick?: () => void;
  finalGuess: boolean;
}

export default function GuessModeButton({
  className,
  guessingMode,
  onClick,
  finalGuess,
}: GuessModeButtonProps) {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  }

  if (guessingMode === GuessingMode.Individual) {
    return (
      <button
        onClick={onClick}
        onKeyDown={handleKeyDown}
        className={`bg-indigo-500 rounded-full font-bold py-2 px-4 text-white shadow-sm ${
          className || ""
        }`}
      >
        Guessing Mode: Letters
      </button>
    );
  } else {
    return (
      <button
        onClick={onClick}
        onKeyDown={handleKeyDown}
        className={`bg-pink-500 rounded-full font-bold py-2 px-4 text-white shadow-sm ${
          className || ""
        }`}
      >
        {finalGuess ? "Final Guess!" : "Guessing Mode: Phrase"}
      </button>
    );
  }
}
