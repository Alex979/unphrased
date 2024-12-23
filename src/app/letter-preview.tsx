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
  const [isPopping, setIsPopping] = useState(false);
  const jiggleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (jiggleTrigger === 0) {
      return;
    }
    setIsJiggling(true);
  }, [jiggleTrigger]);

  useEffect(() => {
    if (!letter) {
      return;
    }
    setIsPopping(true);
  }, [letter]);

  // When jiggle animation ends, remove jiggle class.
  useEffect(() => {
    const handleAnimationEnd = (event: AnimationEvent) => {
      if (event.animationName === "jiggle") {
        setIsJiggling(false);
      } else if (event.animationName === "pop") {
        setIsPopping(false);
      }
    };

    const jiggleElement = jiggleRef.current;
    jiggleElement?.addEventListener("animationend", handleAnimationEnd);

    return () => {
      jiggleElement?.removeEventListener("animationend", handleAnimationEnd);
    };
  }, []);

  return (
    <div
      className={`w-14 h-14 tiny:w-12 tiny:h-12 border-2 dark:border-neutral-600 ${borderClass} rounded flex justify-center items-center text-3xl tiny:text-2xl font-bold ${
        className || ""
      } ${isJiggling ? "animate-jiggle" : ""} ${isPopping ? "animate-pop" : ""}`}
      ref={jiggleRef}
    >
      {letter?.toUpperCase()}
    </div>
  );
}
