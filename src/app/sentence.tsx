import { Inconsolata } from "next/font/google";
import { AlphabetChar, isAlphabetChar } from "./types";

const inconsolata = Inconsolata({ subsets: ["latin"] });

interface SentenceProps {
  sentence: string;
  guessedLetters: Set<AlphabetChar>;
}

export default function Sentence({ sentence, guessedLetters }: SentenceProps) {
  const formatSentence = () => {
    return sentence
      .toLowerCase()
      .split("")
      .map((letter, index) => {
        if (!isAlphabetChar(letter) || guessedLetters.has(letter)) {
          return letter;
        }
        return "_";
      })
      .join("")
      .toUpperCase();
  };

  return (
    <div className="p-12 text-center">
      <p className={`text-3xl ${inconsolata.className} font-bold`}>{formatSentence()}</p>
    </div>
  );
}
