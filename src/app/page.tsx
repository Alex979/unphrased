"use client";

import { useState } from "react";
import VirtualKeyboard from "./keyboard";
import Sentence from "./sentence";
import { AlphabetChar, GuessingMode } from "./types";
import LetterPreview from "./letter-preview";
import GuessModeButton from "./guess-mode-btn";

export default function Home() {
  const [guessingMode, setGuessingMode] = useState<GuessingMode>(
    GuessingMode.Individual
  );
  const [queuedLetter, setQueuedLetter] = useState<AlphabetChar | null>();
  const [guessedLetters, setGuessedLetters] = useState<Set<AlphabetChar>>(
    new Set()
  );
  const [sentenceGuesses, setSentenceGuesses] = useState<AlphabetChar[]>([]);

  const onLetterPress = (letter: AlphabetChar) => {
    if (guessingMode === GuessingMode.Individual) {
      setQueuedLetter(letter);
    } else {
      setSentenceGuesses((prevSentenceGuesses) => {
        return [...prevSentenceGuesses, letter];
      });
    }
  };

  const onBackspace = () => {
    if (guessingMode === GuessingMode.Individual) {
      setQueuedLetter(null);
    } else {
      setSentenceGuesses((prevSentenceGuesses) => {
        return prevSentenceGuesses.slice(0, -1);
      });
    }
  };

  const onEnter = () => {
    if (guessingMode === GuessingMode.Individual) {
      if (!queuedLetter) {
        return;
      }
      setGuessedLetters((prevGuessedLetters) => {
        const newGuessedLetters = new Set(prevGuessedLetters);
        newGuessedLetters.add(queuedLetter);
        return newGuessedLetters;
      });
      setQueuedLetter(null);
    }
  };

  const toggleGuessingMode = () => {
    setGuessingMode((prevGuess) => {
      return prevGuess === GuessingMode.Individual
        ? GuessingMode.Full
        : GuessingMode.Individual;
    });
  }

  return (
    <main className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col justify-center items-center">
        <Sentence
          sentence="the quick brown fox jumped over the lazy dog"
          guessingMode={guessingMode}
          guessedLetters={guessedLetters}
          sentenceGuesses={sentenceGuesses}
        />
      </div>
      <div className="flex flex-col items-center gap-2">
        <div className="w-full flex gap-2 px-2">
          <div className="flex-1"></div>
          <div className="flex justify-center items-center">
            <LetterPreview letter={queuedLetter} />
          </div>
          <div className="flex-1 flex justify-end">
            <GuessModeButton guessingMode={guessingMode} onClick={toggleGuessingMode} />
          </div>
        </div>
        <VirtualKeyboard
          onLetterPress={onLetterPress}
          onBackspace={onBackspace}
          onEnter={onEnter}
        />
      </div>
    </main>
  );
}
