import { Roboto_Mono } from "next/font/google";
import { AlphabetChar, GuessingMode, isAlphabetChar } from "./types";
import { useEffect, useRef, useState } from "react";

const robotoMono = Roboto_Mono({ subsets: ["latin"] });

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

  const dashColorClasses = "text-gray-500 dark:text-neutral-400";

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
              className="inline-block animate-letter-pop"
            >
              <span
                className={`absolute translate-y-1 font-normal ${dashColorClasses}`}
              >
                _
              </span>
              {letter.toUpperCase()}
            </span>
          );
          return;
        }

        // Handle blanks.
        if (guessingMode === GuessingMode.Individual || gameOver) {
          currentSpan.push(
            <span
              key={currentSpan.length - 1}
              className={`inline-block translate-y-1 font-normal ${dashColorClasses}`}
            >
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
              className="text-pink-500 inline-block translate-y-1 font-normal"
            >
              <span className="absolute translate-y-1/2 text-pink-500 font-bold">
                ^
              </span>
              _
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
              <span className="absolute translate-y-1 font-normal opacity-80">
                _
              </span>
              {sentenceGuesses[blankIndex].toUpperCase()}
            </span>
          );
          return;
        }
        currentSpan.push(
          <span
            key={currentSpan.length - 1}
            className={`inline-block translate-y-1 font-normal ${dashColorClasses}`}
          >
            _
          </span>
        );
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
      className={`mx-8 my-4 text-center ${isJiggling ? "animate-jiggle" : ""}`}
      ref={jiggleRef}
    >
      <p
        className={`relative text-2xl tiny:text-xl ${robotoMono.className} font-bold leading-loose tiny:leading-loose tracking-wider`}
      >
        {formatSentence()}
      </p>
    </div>
  );
}
