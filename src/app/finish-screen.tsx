import ShareButton from "./share-btn";
import { Roboto_Slab } from "next/font/google";
import BlockQuote from "./block-quote";
import StatRankings from "./stat-rankings";

const robotoSlab = Roboto_Slab({ subsets: ["latin"] });

interface FinishScreenProps {
  didWin: boolean;
  sentence: string;
  guessCount: number;
  guessHistory: boolean[];
  maxGuesses: number;
  puzzleNumber: number;
  puzzleId: string;
  scoreLogged: boolean;
  addNotification: (message: string) => void;
}

export default function FinishScreen({
  didWin,
  sentence,
  guessCount,
  guessHistory,
  puzzleNumber,
  maxGuesses,
  puzzleId,
  scoreLogged,
  addNotification,
}: FinishScreenProps) {
  return (
    <div className="w-full h-full flex justify-center overflow-y-auto">
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
        <p className="my-4 text-center">
          Come back tomorrow to guess a new phrase.
        </p>
        <div className="flex justify-center mb-6 mt-7">
          <ShareButton
            className=""
            guessHistory={guessHistory}
            maxGuesses={maxGuesses}
            puzzleNumber={puzzleNumber}
            addNotification={addNotification}
          />
        </div>
        <hr className="border-gray-300 dark:border-neutral-700" />
        <StatRankings
          userGuesses={guessCount}
          didWin={didWin}
          puzzleId={puzzleId}
          scoreLogged={scoreLogged}
        />
        <div className="flex">
          <div className="mt-4"></div>
        </div>
      </div>
    </div>
  );
}
