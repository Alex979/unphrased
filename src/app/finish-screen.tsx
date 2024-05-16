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
    <div className="w-full h-full flex justify-center">
      <div className="px-8">
        <h1
          className={`text-center font-extrabold text-3xl mb-4 leading-tight ${robotoSlab.className}`}
        >
          {didWin ? "Well done!" : "Better luck next time!"}
        </h1>
        {didWin ? (
          <p className="my-2 text-center">
            You solved the phrase in{" "}
            <span className="font-bold">{guessCount}</span>{" "}
            {guessCount === 1 ? "guess" : "guesses"}.
          </p>
        ) : (
          <p className="my-2 text-center">The phrase was</p>
        )}
        <BlockQuote>{sentence.toUpperCase()}</BlockQuote>
        <p className="my-2 text-center">
          Come back tomorrow to guess a new phrase.
        </p>
        <div className="flex justify-center">
          <ShareButton
            className="my-2"
            guessHistory={guessHistory}
            maxGuesses={maxGuesses}
            puzzleNumber={puzzleNumber}
          />
        </div>
      </div>
    </div>
  );
}
