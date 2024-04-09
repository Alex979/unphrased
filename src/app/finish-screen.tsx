import { Inconsolata } from "next/font/google";
import ShareButton from "./share-btn";
import { Roboto_Slab } from "next/font/google";
import BlockQuote from "./block-quote";

const robotoSlab = Roboto_Slab({ subsets: ["latin"] });
const inconsolata = Inconsolata({ subsets: ["latin"] });

interface FinishScreenProps {
  didWin: boolean;
  sentence: string;
  guessCount: number;
  guessHistory: boolean[];
  maxGuesses: number;
  puzzleNumber: number;
}

export default function FinishScreen({
  didWin,
  sentence,
  guessCount,
  guessHistory,
  puzzleNumber,
  maxGuesses,
}: FinishScreenProps) {
  return (
    <div className="w-full h-full flex justify-center pt-20">
      <div className="p-8">
        <h1
          className={`font-extrabold text-4xl my-2 text-center leading-tight ${robotoSlab.className}`}
        >
          {didWin ? "Well done!" : "Better luck next time!"}
        </h1>
        {didWin ? (
          <p className="my-2 text-lg">
            You solved the phrase in{" "}
            <span className="font-bold">{guessCount}</span>{" "}
            {guessCount === 1 ? "guess" : "guesses"}!
          </p>
        ) : (
          <p className="my-2 text-lg">The phrase was:</p>
        )}
        <BlockQuote>{sentence.toUpperCase()}</BlockQuote>
        <div className="flex justify-center">
          <ShareButton
            guessHistory={guessHistory}
            maxGuesses={maxGuesses}
            puzzleNumber={puzzleNumber}
          />
        </div>
      </div>
    </div>
  );
}
