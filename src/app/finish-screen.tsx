import { Inconsolata } from "next/font/google";
import ShareButton from "./share-btn";
import { Roboto_Slab } from "next/font/google";

const robotoSlab = Roboto_Slab({ subsets: ["latin"] });
const inconsolata = Inconsolata({ subsets: ["latin"] });

interface FinishScreenProps {
  didWin: boolean;
  sentence: string;
  guessCount: number;
  guessHistory: boolean[];
  puzzleNumber: number;
}

export default function FinishScreen({
  didWin,
  sentence,
  guessCount,
  guessHistory,
  puzzleNumber,
}: FinishScreenProps) {
  return (
    <div className="w-full h-full flex justify-center pt-20">
      <div className="p-8">
        <h1 className={`font-extrabold text-4xl my-2 text-center leading-tight ${robotoSlab.className}`}>
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
        <div className="border rounded p-2 bg-slate-200 my-4">
          <p
            className={`font-extrabold text-xl text-slate-600 ${inconsolata.className}`}
          >
            {sentence.toUpperCase()}
          </p>
        </div>
        <div className="flex justify-center">
          <ShareButton
            guessHistory={guessHistory}
            puzzleNumber={puzzleNumber}
          />
        </div>
      </div>
    </div>
  );
}
