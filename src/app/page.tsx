"use client";

import { useState } from "react";
import VirtualKeyboard from "./keyboard";
import Sentence from "./sentence";
import { AlphabetChar, GuessingMode, isAlphabetChar } from "./types";
import LetterPreview from "./letter-preview";
import GuessModeButton from "./guess-mode-btn";

export default function Home() {
  const sentence = "she sells sea shells by the sea shore";

  const [guessingMode, setGuessingMode] = useState<GuessingMode>(
    GuessingMode.Individual
  );
  const [queuedLetter, setQueuedLetter] = useState<AlphabetChar | null>();
  const [guessedLetters, setGuessedLetters] = useState<Set<AlphabetChar>>(
    new Set()
  );
  const [sentenceGuesses, setSentenceGuesses] = useState<AlphabetChar[]>([]);
  const [solved, setSolved] = useState(false);

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
        checkForWin(newGuessedLetters, sentenceGuesses);
        return newGuessedLetters;
      });
      setQueuedLetter(null);
    } else {
      checkForWin(guessedLetters, sentenceGuesses);
    }
  };

  const toggleGuessingMode = () => {
    if (guessingMode === GuessingMode.Individual) {
      setGuessingMode(GuessingMode.Full);
      setQueuedLetter(null);
    } else {
      setGuessingMode(GuessingMode.Individual);
      setSentenceGuesses([]);
    }
  };

  const checkForWin = (
    guessedLetters: Set<AlphabetChar>,
    sentenceGuesses: AlphabetChar[]
  ) => {
    console.log("Checcking for win...");
    let blankIndex = -1;
    let didSolve = true;
    for (let char of sentence) {
      if (!isAlphabetChar(char)) {
        continue;
      }
      console.log(guessedLetters);
      if (guessedLetters.has(char)) {
        continue;
      }

      blankIndex++;
      if (blankIndex >= sentenceGuesses.length) {
        console.log(
          `blankIndex (${blankIndex}) >= sentenceGuesses.length (${sentenceGuesses.length}): not solved`
        );
        didSolve = false;
        break;
      }

      if (sentenceGuesses[blankIndex] !== char) {
        console.log(
          `sentenceGuesses[${blankIndex}] (${sentenceGuesses[blankIndex]}) !== char (${char}): not solved`
        );
        didSolve = false;
        break;
      }
    }

    setSolved(didSolve);
    if (didSolve) {
      // Add all remaining letters to guessedLetters if solved.
      const remainingLetters: Set<AlphabetChar> = new Set();
      for (let char of sentence) {
        if (!isAlphabetChar(char) || guessedLetters.has(char)) {
          continue;
        }
        remainingLetters.add(char);
      }
      setGuessedLetters((prevGuessedLetters) => {
        const newGuessedLetters = new Set(prevGuessedLetters);
        remainingLetters.forEach((char) => {
          newGuessedLetters.add(char);
        });
        return newGuessedLetters;
      });
    }
  };

  return (
    <main className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col justify-center items-center">
        <LetterPreview
          letter={queuedLetter}
          className={
            guessingMode === GuessingMode.Full || solved ? "invisible" : ""
          }
        />
        <Sentence
          sentence={sentence}
          guessingMode={guessingMode}
          guessedLetters={guessedLetters}
          sentenceGuesses={sentenceGuesses}
        />
      </div>
      <div className="flex flex-col items-center gap-2">
        <div className="px-2 w-full max-w-64">
          <GuessModeButton
            className={`w-full ${solved ? "invisible" : ""}`}
            guessingMode={guessingMode}
            onClick={toggleGuessingMode}
          />
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
