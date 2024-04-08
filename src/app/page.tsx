"use client";

import { useEffect, useState } from "react";
import VirtualKeyboard from "./keyboard";
import Sentence from "./sentence";
import { AlphabetChar, GuessingMode, isAlphabetChar } from "./types";
import LetterPreview from "./letter-preview";
import GuessModeButton from "./guess-mode-btn";
import Header from "./header";
import GuessCounter from "./guess-counter";
import Popup from "./popup";
import FinishScreen from "./finish-screen";
import ShowResultsButton from "./show-results-btn";

function useGameState() {
  const [currentGuess, setCurrentGuess] = useState(1);
  const [guessHistory, setGuessHistory] = useState<boolean[]>([]);
  const [guessingMode, setGuessingMode] = useState<GuessingMode>(
    GuessingMode.Individual
  );
  const [queuedLetter, setQueuedLetter] = useState<AlphabetChar | null>();
  const [guessedLetters, setGuessedLetters] = useState<Set<AlphabetChar>>(
    new Set()
  );
  const [sentenceGuesses, setSentenceGuesses] = useState<AlphabetChar[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [solved, setSolved] = useState(false);

  const addGuessHistory = (guess: boolean) => {
    setGuessHistory((prevGuessHistory) => {
      return [...prevGuessHistory, guess];
    });
  };

  const addSentenceGuess = (letter: AlphabetChar) => {
    setSentenceGuesses((prevSentenceGuesses) => {
      return [...prevSentenceGuesses, letter];
    });
  };

  const popSentenceGuess = () => {
    setSentenceGuesses((prevSentenceGuesses) => {
      return prevSentenceGuesses.slice(0, -1);
    });
  };

  return {
    currentGuess,
    setCurrentGuess,
    guessHistory,
    addGuessHistory,
    guessingMode,
    setGuessingMode,
    queuedLetter,
    setQueuedLetter,
    guessedLetters,
    setGuessedLetters,
    sentenceGuesses,
    setSentenceGuesses,
    addSentenceGuess,
    popSentenceGuess,
    gameOver,
    setGameOver,
    solved,
    setSolved,
  };
}

export default function Home() {
  const sentence = "she sells sea shells by the sea shore";
  const maxGuesses = 12;

  // Game state.
  const game = useGameState();

  // Animation states.
  const [sentenceJiggleTrigger, setSentenceJiggleTrigger] = useState(0);
  const [previewJiggleTrigger, setPreviewJiggleTrigger] = useState(0);

  // Popup state.
  const [popupOpen, setPopupOpen] = useState(false);

  // Force full guessing mode when on last guess.
  useEffect(() => {
    if (game.currentGuess === maxGuesses) {
      game.setGuessingMode(GuessingMode.Full);
    }
    if (game.currentGuess > maxGuesses) {
      game.setGameOver(true);
    }
  }, [game.currentGuess]);

  // Open popup with a delay after game is over.
  useEffect(() => {
    if (game.gameOver) {
      const timeoutId = setTimeout(() => {
        setPopupOpen(true);
      }, 500);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [game.gameOver]);

  const onLetterPress = (letter: AlphabetChar) => {
    if (game.gameOver) {
      return;
    }

    if (game.guessingMode === GuessingMode.Individual) {
      game.setQueuedLetter(letter);
    } else {
      if (game.sentenceGuesses.length < numBlanksInSentence()) {
        if (game.guessedLetters.has(letter)) {
          jiggleSentence();
          return;
        }
        game.addSentenceGuess(letter);
      }
    }
  };

  const onBackspace = () => {
    if (game.gameOver) {
      return;
    }

    if (game.guessingMode === GuessingMode.Individual) {
      game.setQueuedLetter(null);
    } else {
      game.popSentenceGuess();
    }
  };

  const onEnter = () => {
    if (game.gameOver) {
      return;
    }

    if (game.guessingMode === GuessingMode.Individual) {
      if (!game.queuedLetter) {
        jiggleLetterPreview();
        return;
      }

      if (game.guessedLetters.has(game.queuedLetter)) {
        jiggleLetterPreview();
        game.setQueuedLetter(null);
        return;
      }

      game.setGuessedLetters((prevGuessedLetters) => {
        const newGuessedLetters = new Set(prevGuessedLetters);
        newGuessedLetters.add(game.queuedLetter!);
        checkForWin(newGuessedLetters, game.sentenceGuesses);
        return newGuessedLetters;
      });
      if (!sentence.includes(game.queuedLetter)) {
        jiggleLetterPreview();
      }
      game.setQueuedLetter(null);
      game.setCurrentGuess((prevGuess) => prevGuess + 1);
    } else {
      const didWin = checkForWin(game.guessedLetters, game.sentenceGuesses);
      if (!didWin) {
        jiggleSentence();
      }
      if (game.sentenceGuesses.length === numBlanksInSentence()) {
        game.setSentenceGuesses([]);
        game.setCurrentGuess((prevGuess) => prevGuess + 1);
      }
    }
  };

  const toggleGuessingMode = () => {
    if (game.currentGuess === maxGuesses) {
      return;
    }

    if (game.guessingMode === GuessingMode.Individual) {
      game.setGuessingMode(GuessingMode.Full);
      game.setQueuedLetter(null);
    } else {
      game.setGuessingMode(GuessingMode.Individual);
      game.setSentenceGuesses([]);
    }
  };

  const checkForWin = (
    guessedLetters: Set<AlphabetChar>,
    sentenceGuesses: AlphabetChar[]
  ) => {
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

    game.setSolved(didSolve);
    game.addGuessHistory(didSolve);
    if (didSolve) {
      // Add all remaining letters to guessedLetters if solved.
      const remainingLetters: Set<AlphabetChar> = new Set();
      for (let char of sentence) {
        if (!isAlphabetChar(char) || guessedLetters.has(char)) {
          continue;
        }
        remainingLetters.add(char);
      }
      game.setGuessedLetters((prevGuessedLetters) => {
        const newGuessedLetters = new Set(prevGuessedLetters);
        remainingLetters.forEach((char) => {
          newGuessedLetters.add(char);
        });
        return newGuessedLetters;
      });
      game.setGameOver(true);
    }

    return didSolve;
  };

  const numBlanksInSentence = () => {
    let numBlanks = 0;
    for (let char of sentence) {
      if (!isAlphabetChar(char) || game.guessedLetters.has(char)) {
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
    <main className="min-h-full flex flex-col">
      <Header />
      <div className="flex-1 flex flex-col justify-center items-center">
        <LetterPreview
          letter={game.queuedLetter}
          className={
            game.guessingMode === GuessingMode.Full || game.solved
              ? "invisible"
              : ""
          }
          jiggleTrigger={previewJiggleTrigger}
        />
        <Sentence
          sentence={sentence}
          guessingMode={game.guessingMode}
          guessedLetters={game.guessedLetters}
          sentenceGuesses={game.sentenceGuesses}
          jiggleTrigger={sentenceJiggleTrigger}
          gameOver={game.gameOver}
        />
      </div>
      <div className="flex flex-col items-center gap-2">
        <GuessCounter
          currentGuess={game.currentGuess}
          maxGuesses={maxGuesses}
        />
        <div className="px-2 w-full max-w-64">
          <ShowResultsButton
            className={`w-full ${game.gameOver ? "" : "hidden"}`}
            onClick={() => setPopupOpen(true)}
          />
          <GuessModeButton
            className={`w-full ${game.gameOver ? "hidden" : ""}`}
            guessingMode={game.guessingMode}
            onClick={toggleGuessingMode}
            finalGuess={game.currentGuess === maxGuesses}
          />
        </div>
        <VirtualKeyboard
          onLetterPress={onLetterPress}
          onBackspace={onBackspace}
          onEnter={onEnter}
          guessedLetters={game.guessedLetters}
        />
      </div>
      <Popup open={popupOpen} onClose={() => setPopupOpen(false)}>
        <FinishScreen
          didWin={game.solved}
          guessCount={game.currentGuess - 1}
          guessHistory={game.guessHistory}
          sentence={sentence}
          puzzleNumber={1}
        />
      </Popup>
    </main>
  );
}
