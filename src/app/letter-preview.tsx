import { AlphabetChar } from "./types";

interface LetterPreviewProps {
  className?: string;
  letter?: AlphabetChar | null;
}

export default function LetterPreview({ className, letter }: LetterPreviewProps) {
  const borderClass = letter ? "border-slate-400" : "border-slate-300";
  return (
    <div className={`w-14 h-14 border-2 ${borderClass} rounded flex justify-center items-center text-3xl font-bold ${className || ''}`}>
      {letter?.toUpperCase()}
    </div>
  );
}
