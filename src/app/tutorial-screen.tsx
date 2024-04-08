import { Roboto_Slab } from "next/font/google";
import { isAlphabetChar } from "./types";
import { Inconsolata } from "next/font/google";

const robotoSlab = Roboto_Slab({ subsets: ["latin"] });
const inconsolata = Inconsolata({ subsets: ["latin"] });

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
    <div className="w-full h-full flex justify-center overflow-y-scroll">
      <div className="max-w-96 px-8">
        <h1
          className={`font-extrabold text-4xl mb-4 text-center leading-tight ${robotoSlab.className}`}
        >
          How to play
        </h1>
        <ul className="list-disc mx-4 leading-relaxed space-y-2">
          <li>
            Reveal the hidden phrase in{" "}
            <span className="font-bold">{maxGuesses} guesses.</span>
          </li>
          <div className="border rounded p-2 bg-slate-200 my-4">
            <p
              className={`font-extrabold text-xl text-slate-600 ${inconsolata.className}`}
            >
              _______ __ ___ ______ __ ___ _____
            </p>
          </div>
          <li>
            Guess <span className="font-bold">individual letters</span> to
            reveal them in the phrase.
          </li>
          <div className="border rounded p-2 bg-slate-200 my-4">
            <p
              className={`font-extrabold text-xl text-slate-600 ${inconsolata.className}`}
            >
              _O___E_ TO T_E _E_TE_ O_ T_E E__T_
            </p>
          </div>
          <li>
            Think you know the phrase? Switch the{" "}
            <span className="font-bold">guess mode</span> to guess the entire
            phrase instead.
          </li>
          <div className="border rounded p-2 bg-slate-200 my-4">
            <p
              className={`font-extrabold text-xl text-slate-600 ${inconsolata.className}`}
            >
              <span className="text-pink-500">J</span>O
              <span className="text-pink-500">URN</span>E
              <span className="text-pink-500">Y</span> TO T
              <span className="text-pink-500">H</span>E{" "}
              <span className="text-pink-500">C</span>E
              <span className="text-pink-500">N</span>TE
              <span className="text-pink-500">R</span> O
              <span className="text-pink-500">F</span> T
              <span className="text-pink-500">H</span>E E
              <span className="text-pink-500">AR</span>T
              <span className="text-pink-500">H</span>
            </p>
          </div>
        </ul>
        <div className="mt-6 flex justify-center">
          <button
            onClick={onClose}
            className="border border-gray-700 active:bg-gray-200 rounded-full font-bold py-2 px-8 shadow-sm"
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
}
