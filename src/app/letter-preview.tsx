import { useEffect, useRef, useState } from "react";
import { AlphabetChar } from "./types";

interface LetterPreviewProps {
  className?: string;
  letter?: AlphabetChar | null;
  jiggleTrigger: number;
}

export default function LetterPreview({
  className,
  letter,
  jiggleTrigger,
}: LetterPreviewProps) {
  const borderClass = letter ? "border-slate-400" : "border-slate-300";

  const [isJiggling, setIsJiggling] = useState(false);
  const jiggleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (jiggleTrigger === 0) {
      return;
    }
    setIsJiggling(true);
  }, [jiggleTrigger]);

  // When jiggle animation ends, remove jiggle class.
  useEffect(() => {
    const handleAnimationEnd = () => {
      setIsJiggling(false);
    };

    const jiggleElement = jiggleRef.current;
    jiggleElement?.addEventListener("animationend", handleAnimationEnd);

    return () => {
      jiggleElement?.removeEventListener("animationend", handleAnimationEnd);
    };
  }, []);

  return (
    <div
      className={`w-14 h-14 border-2 dark:border-zinc-600 ${borderClass} rounded flex justify-center items-center text-3xl font-bold ${
        className || ""
      } ${isJiggling ? "animate-jiggle" : ""}`}
      ref={jiggleRef}
    >
      {letter?.toUpperCase()}
    </div>
  );
}
