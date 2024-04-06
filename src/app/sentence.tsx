import { Inconsolata } from "next/font/google";
import { AlphabetChar, GuessingMode, isAlphabetChar } from "./types";

const inconsolata = Inconsolata({ subsets: ["latin"] });

interface SentenceProps {
  sentence: string;
  guessedLetters: Set<AlphabetChar>;
  guessingMode: GuessingMode;
  sentenceGuesses: AlphabetChar[];
}

export default function Sentence({
  sentence,
  guessedLetters,
  guessingMode,
  sentenceGuesses,
}: SentenceProps) {
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
        if (!isAlphabetChar(letter) || guessedLetters.has(letter)) {
          currentSpan.push(<span key={currentSpan.length - 1} className="inline-block animate-pop">{letter.toUpperCase()}</span>);
          return;
        }

        // Handle blanks.
        if (guessingMode === GuessingMode.Individual) {
          currentSpan.push(<span key={currentSpan.length - 1} className="inline-block">_</span>);
          return;
        }
        blankIndex++;
        if (blankIndex === sentenceGuesses.length) {
          currentSpan.push(
            <span key={currentSpan.length - 1} className="text-red-500 inline-block">
              <span className="absolute translate-y-1/2 text-red-500">^</span>_
            </span>
          );
          return;
        }
        if (blankIndex < sentenceGuesses.length) {
          currentSpan.push(
            <span key={currentSpan.length - 1} className="text-red-500 inline-block">
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
    <div className="p-12 text-center">
      <p
        className={`text-3xl ${inconsolata.className} font-bold leading-loose text-black`}
      >
        {formatSentence()}
      </p>
    </div>
  );
}
