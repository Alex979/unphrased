"use client";

import { useState } from "react";
import VirtualKeyboard from "./keyboard";
import Sentence from "./sentence";
import { AlphabetChar } from "./types";

export default function Home() {
  const [guessedLetters, setGuessedLetters] = useState<Set<AlphabetChar>>(
    new Set()
  );

  const onLetterGuess = (letter: AlphabetChar) => {
    setGuessedLetters((prevGuessedLetters) => {
      const newGuessedLetters = new Set(prevGuessedLetters);
      newGuessedLetters.add(letter);
      return newGuessedLetters;
    });
  };

  return (
    <main className="min-h-screen flex flex-col">
      <div className="flex-1 flex justify-center items-center">
        <Sentence
          sentence="the quick brown fox jumped over the lazy dog"
          guessedLetters={guessedLetters}
        />
      </div>
      <div className="flex justify-center">
        <VirtualKeyboard onLetterGuess={onLetterGuess} />
      </div>
    </main>
  );
}
