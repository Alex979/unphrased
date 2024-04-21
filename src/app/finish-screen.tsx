import ShareButton from "./share-btn";
import { Roboto_Slab } from "next/font/google";
import BlockQuote from "./block-quote";

const robotoSlab = Roboto_Slab({ subsets: ["latin"] });

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
    <div className="w-full h-full flex justify-center pt-10">
      <div className="p-8">
        <h1
          className={`font-extrabold text-4xl mb-6 leading-tight ${robotoSlab.className}`}
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
        <p className="my-2 text-lg">
          Come back tomorrow to guess a new phrase.
        </p>
        <div className="flex justify-center">
          <ShareButton
            className="my-8"
            guessHistory={guessHistory}
            maxGuesses={maxGuesses}
            puzzleNumber={puzzleNumber}
          />
        </div>
      </div>
    </div>
  );
}
