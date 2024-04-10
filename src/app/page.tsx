"use client";

import { useEffect, useState } from "react";
import VirtualKeyboard from "./keyboard";
import Sentence from "./sentence";
import { AlphabetChar, GuessingMode, isAlphabetChar } from "./types";
import LetterPreview from "./letter-preview";
import Header from "./header";
import GuessCounter from "./guess-counter";
import Popup from "./popup";
import FinishScreen from "./finish-screen";
import ShowResultsButton from "./show-results-btn";
import TutorialScreen from "./tutorial-screen";
import Hint from "./hint";
import GuessModeToggle from "./guess-mode-toggle";
import { useGameState } from "./game-state";

export default function Home() {
  const sentence = "out of sight, out of mind";
  const maxGuesses = 8;

  // Game state.
  const game = useGameState();

  // Animation states.
  const [sentenceJiggleTrigger, setSentenceJiggleTrigger] = useState(0);
  const [previewJiggleTrigger, setPreviewJiggleTrigger] = useState(0);

  // Popup state.
  const [popupOpen, setPopupOpen] = useState(true);

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
        game.addGuessHistory(false);
      } else {
        game.addGuessHistory(true);
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
        game.addGuessHistory(didWin);
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
      char = char.toLowerCase();

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
      char = char.toLowerCase();
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

  if (game.loading) {
    return (
      <main className="min-h-full flex justify-center items-center">
        <div role="status">
          <svg
            aria-hidden="true"
            className="w-32 h-32 text-slate-300 dark:text-zinc-700 animate-spin fill-slate-500 dark:fill-zinc-400"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-full flex flex-col">
      <Header onOpenHelp={() => setPopupOpen(true)} />
      <div className="flex-1 flex flex-col justify-center items-center">
        <div className="grow flex flex-col justify-between items-center max-h-80">
          <Hint emojis="😰🙈😌" guessingMode={game.guessingMode} />
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
      </div>
      <div className="flex flex-col items-center gap-2">
        <GuessCounter
          currentGuess={game.currentGuess}
          maxGuesses={maxGuesses}
        />
        <div className="px-2 w-full flex justify-center">
          <ShowResultsButton
            className={`${game.gameOver ? "" : "hidden"}`}
            onClick={() => setPopupOpen(true)}
          />
          <GuessModeToggle
            className={`${game.gameOver ? "hidden" : ""}`}
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
          guessingMode={game.guessingMode}
          submitDisabled={
            (game.guessingMode === GuessingMode.Full &&
              game.sentenceGuesses.length < numBlanksInSentence()) ||
            game.gameOver
          }
        />
      </div>
      <Popup open={popupOpen} onClose={() => setPopupOpen(false)}>
        {game.gameOver ? (
          <FinishScreen
            didWin={game.solved}
            guessCount={game.currentGuess - 1}
            guessHistory={game.guessHistory}
            maxGuesses={maxGuesses}
            sentence={sentence}
            puzzleNumber={3}
          />
        ) : (
          <TutorialScreen
            maxGuesses={maxGuesses}
            sentence={sentence}
            onClose={() => setPopupOpen(false)}
          />
        )}
      </Popup>
    </main>
  );
}
