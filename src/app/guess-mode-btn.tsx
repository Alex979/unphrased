import { GuessingMode } from "./types";

interface GuessModeButtonProps {
  guessingMode: GuessingMode;
  onClick?: () => void;
}

export default function GuessModeButton({
  guessingMode,
  onClick,
}: GuessModeButtonProps) {
  if (guessingMode === GuessingMode.Individual) {
    return <button onClick={onClick} className="bg-sky-500 rounded-full font-bold p-3 text-white w-full max-w-40">Guess</button>;
  } else {
    return <button onClick={onClick} className="bg-red-500 rounded-full font-bold p-3 text-white w-full max-w-40">Cancel</button>;
  }
}
