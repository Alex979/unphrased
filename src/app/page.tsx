"use client";

import { useState } from "react";
import VirtualKeyboard from "./keyboard";
import Sentence from "./sentence";
import { AlphabetChar } from "./types";
import LetterPreview from "./letter-preview";

export default function Home() {
  const [queuedLetter, setQueuedLetter] = useState<AlphabetChar | null>();
  const [guessedLetters, setGuessedLetters] = useState<Set<AlphabetChar>>(
    new Set()
  );

  const onLetterPress = (letter: AlphabetChar) => {
    setQueuedLetter(letter);
  };

  const onBackspace = () => {
    setQueuedLetter(null);
  };

  const onEnter = () => {
    if (!queuedLetter) {
      return;
    }
    setGuessedLetters((prevGuessedLetters) => {
      const newGuessedLetters = new Set(prevGuessedLetters);
      newGuessedLetters.add(queuedLetter);
      return newGuessedLetters;
    });
    setQueuedLetter(null);
  };

  return (
    <main className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col justify-center items-center">
        <Sentence
          sentence="the quick brown fox jumped over the lazy dog"
          guessedLetters={guessedLetters}
        />
      </div>
      <div className="flex flex-col items-center gap-2">
        <LetterPreview letter={queuedLetter} />
        <VirtualKeyboard
          onLetterPress={onLetterPress}
          onBackspace={onBackspace}
          onEnter={onEnter}
        />
      </div>
    </main>
  );
}
