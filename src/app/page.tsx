"use client";

import { useEffect, useState } from "react";
import VirtualKeyboard from "./keyboard";
import Sentence from "./sentence";
import { AlphabetChar, GuessingMode, isAlphabetChar } from "./types";
import LetterPreview from "./letter-preview";
import GuessModeButton from "./guess-mode-btn";
import Header from "./header";
import GuessCounter from "./guess-counter";

export default function Home() {
  const sentence = "she sells sea shells by the sea shore";
  const maxGuesses = 12;

  // Game state.
  const [currentGuess, setCurrentGuess] = useState(1);
  const [guessingMode, setGuessingMode] = useState<GuessingMode>(
    GuessingMode.Individual
  );
  const [queuedLetter, setQueuedLetter] = useState<AlphabetChar | null>();
  const [guessedLetters, setGuessedLetters] = useState<Set<AlphabetChar>>(
    new Set()
  );
  const [sentenceGuesses, setSentenceGuesses] = useState<AlphabetChar[]>([]);
  const [solved, setSolved] = useState(false);

  // Animation states.
  const [sentenceJiggleTrigger, setSentenceJiggleTrigger] = useState(0);
  const [previewJiggleTrigger, setPreviewJiggleTrigger] = useState(0);

  // Force full guessing mode when on last guess.
  useEffect(() => {
    if (currentGuess === maxGuesses) {
      setGuessingMode(GuessingMode.Full);
    }
  }, [currentGuess]);

  const onLetterPress = (letter: AlphabetChar) => {
    if (guessingMode === GuessingMode.Individual) {
      setQueuedLetter(letter);
    } else {
      if (sentenceGuesses.length < numBlanksInSentence()) {
        if (guessedLetters.has(letter)) {
          jiggleSentence();
          return;
        }
        setSentenceGuesses((prevSentenceGuesses) => {
          return [...prevSentenceGuesses, letter];
        });
      }
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
        jiggleLetterPreview();
        return;
      }

      if (guessedLetters.has(queuedLetter)) {
        jiggleLetterPreview();
        setQueuedLetter(null);
        return;
      }

      setGuessedLetters((prevGuessedLetters) => {
        const newGuessedLetters = new Set(prevGuessedLetters);
        newGuessedLetters.add(queuedLetter);
        checkForWin(newGuessedLetters, sentenceGuesses);
        return newGuessedLetters;
      });
      if (!sentence.includes(queuedLetter)) {
        jiggleLetterPreview();
      }
      setQueuedLetter(null);
      setCurrentGuess((prevGuess) => prevGuess + 1);
    } else {
      const didWin = checkForWin(guessedLetters, sentenceGuesses);
      if (!didWin) {
        jiggleSentence();
      }
      if (sentenceGuesses.length === numBlanksInSentence()) {
        setSentenceGuesses([]);
        setCurrentGuess((prevGuess) => prevGuess + 1);
      }
    }
  };

  const toggleGuessingMode = () => {
    if (currentGuess === maxGuesses) {
      return;
    }
    
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

      if (guessedLetters.has(char)) {
        continue;
      }

      blankIndex++;
      if (blankIndex >= sentenceGuesses.length) {
        didSolve = false;
        break;
      }

      if (sentenceGuesses[blankIndex] !== char) {
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

    return didSolve;
  };

  const numBlanksInSentence = () => {
    let numBlanks = 0;
    for (let char of sentence) {
      if (!isAlphabetChar(char) || guessedLetters.has(char)) {
        continue;
      }

      numBlanks++;
    }
    return numBlanks;
  };

  const jiggleSentence = () => {
    setSentenceJiggleTrigger((prev) => prev + 1);
  };

  const jiggleLetterPreview = () => {
    setPreviewJiggleTrigger((prev) => prev + 1);
  };

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex flex-col justify-center items-center">
        <LetterPreview
          letter={queuedLetter}
          className={
            guessingMode === GuessingMode.Full || solved ? "invisible" : ""
          }
          jiggleTrigger={previewJiggleTrigger}
        />
        <Sentence
          sentence={sentence}
          guessingMode={guessingMode}
          guessedLetters={guessedLetters}
          sentenceGuesses={sentenceGuesses}
          jiggleTrigger={sentenceJiggleTrigger}
        />
      </div>
      <div className="flex flex-col items-center gap-2">
        <GuessCounter currentGuess={currentGuess} maxGuesses={maxGuesses} />
        <div className="px-2 w-full max-w-64">
          <GuessModeButton
            className={`w-full ${solved ? "invisible" : ""}`}
            guessingMode={guessingMode}
            onClick={toggleGuessingMode}
            finalGuess={currentGuess === maxGuesses}
          />
        </div>
        <VirtualKeyboard
          onLetterPress={onLetterPress}
          onBackspace={onBackspace}
          onEnter={onEnter}
          guessedLetters={guessedLetters}
        />
      </div>
    </main>
  );
}
