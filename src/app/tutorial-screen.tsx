import { Roboto_Slab } from "next/font/google";
import { isAlphabetChar } from "./types";
import BlockQuote from "./block-quote";
import Button from "./_components/button";

const robotoSlab = Roboto_Slab({ subsets: ["latin"] });

interface TutorialScreenProps {
  maxGuesses: number;
  sentence: string;
  onClose: () => void;
}

export default function TutorialScreen({
  maxGuesses,
  sentence,
  onClose,
}: TutorialScreenProps) {
  const formatSentence = () => {
    return Array.from(sentence).map((char) => {
      if (!isAlphabetChar(char)) {
        return char;
      }
      return "_";
    });
  };

  return (
    <div className="w-full h-full flex justify-center overflow-y-auto">
      <div className="max-w-96 px-8">
        <h1
          className={`font-extrabold text-3xl mb-4 leading-tight ${robotoSlab.className}`}
        >
          How to play
        </h1>
        <ul className="list-disc mx-4">
          <li>
            Reveal the hidden phrase in{" "}
            <span className="font-bold">{maxGuesses} guesses.</span>
          </li>
          <BlockQuote>___ _____ ___ ______ ____ ___</BlockQuote>
          <li>
            Guess <span className="font-bold">individual letters</span> to
            reveal them in the phrase.
          </li>
          <BlockQuote>T_O _E___ __E _ETTE_ T___ O_E</BlockQuote>
          <li>
            Think you know the phrase? Switch the{" "}
            <span className="font-bold">guess mode</span> to guess the entire
            phrase instead.
          </li>
          <BlockQuote>
            T<span className="text-pink-500">W</span>O{" "}
            <span className="text-pink-500">H</span>E
            <span className="text-pink-500">ADS</span>{" "}
            <span className="text-pink-500">AR</span>E{" "}
            <span className="text-pink-500">B</span>ETTE
            <span className="text-pink-500">R</span> T
            <span className="text-pink-500">HAN</span> O
            <span className="text-pink-500">N</span>E
          </BlockQuote>
        </ul>
        <div className="mt-6 pb-32 flex justify-center">
          <Button variant="mono" onClick={onClose}>
            Got it!
          </Button>
        </div>
      </div>
    </div>
  );
}
