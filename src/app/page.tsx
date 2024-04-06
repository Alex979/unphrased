import Image from "next/image";
import VirtualKeyboard from "./keyboard";
import Sentence from "./sentence";
import { AlphabetChar } from "./types";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <div className="flex-1 flex justify-center items-center">
        <Sentence
          sentence="the quick brown fox jumped over the lazy dog"
          guessedLetters={new Set<AlphabetChar>(["a", "e", "b"])}
        />
      </div>
      <div className="flex justify-center">
        <VirtualKeyboard />
      </div>
    </main>
  );
}
