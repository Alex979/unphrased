import { GuessingMode } from "./types";

interface GuessModeButtonProps {
  className?: string;
  guessingMode: GuessingMode;
  onClick?: () => void;
}

export default function GuessModeButton({
  className,
  guessingMode,
  onClick,
}: GuessModeButtonProps) {
  if (guessingMode === GuessingMode.Individual) {
    return <button onClick={onClick} className={`bg-sky-500 rounded-full font-bold py-2 px-4 text-white shadow-sm ${className || ''}`}>Guessing Mode: Letters</button>;
  } else {
    return <button onClick={onClick} className={`bg-red-500 rounded-full font-bold py-2 px-4 text-white shadow-sm ${className || ''}`}>Guessing Mode: Phrase</button>;
  }
}
