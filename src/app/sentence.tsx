import { Inconsolata } from "next/font/google";
import { AlphabetChar, GuessingMode, isAlphabetChar } from "./types";
import { useEffect, useRef, useState } from "react";

const inconsolata = Inconsolata({ subsets: ["latin"] });

interface SentenceProps {
  sentence: string;
  guessedLetters: Set<AlphabetChar>;
  guessingMode: GuessingMode;
  sentenceGuesses: AlphabetChar[];
  jiggleTrigger: number;
  gameOver: boolean;
}

export default function Sentence({
  sentence,
  guessedLetters,
  guessingMode,
  sentenceGuesses,
  jiggleTrigger,
  gameOver,
}: SentenceProps) {
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

  const formatSentence = () => {
    let blankIndex = -1;
    let currentSpan: React.ReactNode[] = [];
    const allSpans = [currentSpan];
    sentence
      .toLowerCase()
      .split("")
      .forEach((letter, index) => {
        if (letter === " ") {
          allSpans.push([letter]);
          currentSpan = [];
          allSpans.push(currentSpan);
          return;
        }
        if (!isAlphabetChar(letter)) {
          currentSpan.push(
            <span key={currentSpan.length - 1} className="inline-block">
              {letter.toUpperCase()}
            </span>
          );
          return;
        }

        if (guessedLetters.has(letter)) {
          currentSpan.push(
            <span
              key={currentSpan.length - 1}
              className="inline-block animate-pop"
            >
              {letter.toUpperCase()}
            </span>
          );
          return;
        }

        // Handle blanks.
        if (guessingMode === GuessingMode.Individual || gameOver) {
          currentSpan.push(
            <span key={currentSpan.length - 1} className="inline-block">
              _
            </span>
          );
          return;
        }
        blankIndex++;
        if (blankIndex === sentenceGuesses.length) {
          currentSpan.push(
            <span
              key={currentSpan.length - 1}
              className="text-pink-500 inline-block"
            >
              <span className="absolute translate-y-1/2 text-pink-500">^</span>_
            </span>
          );
          return;
        }
        if (blankIndex < sentenceGuesses.length) {
          currentSpan.push(
            <span
              key={currentSpan.length - 1}
              className="text-pink-500 inline-block"
            >
              {sentenceGuesses[blankIndex].toUpperCase()}
            </span>
          );
          return;
        }
        currentSpan.push(<span key={currentSpan.length - 1}>_</span>);
      });

    return allSpans.map((contents, index) => {
      if (contents.length === 1 && contents[0] === " ") {
        return <span key={index}>{contents}</span>;
      }
      return (
        <span key={index} className="inline-block">
          {contents}
        </span>
      );
    });
  };

  return (
    <div
      className={`mt-12 mx-12 text-center ${isJiggling ? "animate-jiggle" : ""}`}
      ref={jiggleRef}
    >
      <p
        className={`text-3xl ${inconsolata.className} font-bold leading-loose text-black`}
      >
        {formatSentence()}
      </p>
    </div>
  );
}
