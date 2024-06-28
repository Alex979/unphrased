"use client";

import { useEffect, useState } from "react";
import VirtualKeyboard from "./keyboard";
import Sentence from "./sentence";
import {
  AlphabetChar,
  GuessingMode,
  PopupScreen,
  isAlphabetChar,
} from "./types";
import LetterPreview from "./letter-preview";
import Header from "./header";
import GuessCounter from "./guess-counter";
import Popup from "./popup";
import FinishScreen from "./finish-screen";
import TutorialScreen from "./tutorial-screen";
import Hint from "./hint";
import GuessModeToggle from "./guess-mode-toggle";
import { useGameState } from "./game-state";
import { logGuessToServer, logStatsToServer } from "./lib/api";
import Loading from "./loading";
import Notifications from "./notifications";
import Button from "./_components/button";
import HeaderTemplate from "./header-template";
import SmallChip from "./_components/small-chip";
import { loadUserPrefs, saveUserPrefs } from "./lib/localstorage";

export default function Home({ requestedId }: { requestedId?: string }) {
  const maxGuesses = 8;

  // Game state.
  const game = useGameState(requestedId);

  // Animation states.
  const [sentenceJiggleTrigger, setSentenceJiggleTrigger] = useState(0);
  const [previewJiggleTrigger, setPreviewJiggleTrigger] = useState(0);

  // Popup state.
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupScreen, setPopupScreen] = useState(PopupScreen.UNSET);

  // Notifications state.
  const [messages, setMessages] = useState<{ message: string; id: number }[]>(
    []
  );

  // Force full guessing mode when on last guess.
  useEffect(() => {
    if (game.loading) {
      return;
    }

    if (game.currentGuess === maxGuesses) {
      game.setGuessingMode(GuessingMode.Full);
    }
  }, [game.currentGuess, game.loading, game]);

  // Set initial popup screen based on game state.
  useEffect(() => {
    if (game.loading) {
      return;
    }

    if (game.gameOver) {
      setPopupScreen(PopupScreen.RESULTS);
    } else {
      setPopupScreen(PopupScreen.TUTORIAL);
    }

    const userPrefs = loadUserPrefs();
    if (!userPrefs.skipTutorial) {
      setPopupOpen(true);
      userPrefs.skipTutorial = true;
      saveUserPrefs(userPrefs);
    }
  }, [game.gameOver, game.loading]);

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
          addNotification("Letter already guessed");
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
        addNotification("No letter selected");
        return;
      }

      if (game.guessedLetters.has(game.queuedLetter)) {
        jiggleLetterPreview();
        addNotification("Letter already guessed");
        game.setQueuedLetter(null);
        return;
      }

      game.addGuessedLetter(game.queuedLetter);
      const newGuessedLetters = new Set(game.guessedLetters);
      newGuessedLetters.add(game.queuedLetter);
      checkForWin(newGuessedLetters, game.sentenceGuesses, game.currentGuess);

      if (!game.phrase.includes(game.queuedLetter)) {
        jiggleLetterPreview();
        game.addGuessHistory(false);
      } else {
        game.addGuessHistory(true);
      }
      game.setQueuedLetter(null);
      game.setCurrentGuess((prevGuess) => prevGuess + 1);

      // Force full guessing mode when on last guess.
      if (game.currentGuess === maxGuesses - 1) {
        game.setGuessingMode(GuessingMode.Full);
      }
    } else {
      if (game.sentenceGuesses.length < numBlanksInSentence()) {
        jiggleSentence();
        addNotification("Fill in all blanks");
        return;
      }

      const didWin = checkForWin(
        game.guessedLetters,
        game.sentenceGuesses,
        game.currentGuess
      );
      if (!didWin) {
        jiggleSentence();
      }
      game.setSentenceGuesses([]);
      game.setCurrentGuess((prevGuess) => prevGuess + 1);
      game.addGuessHistory(didWin);

      // Force full guessing mode when on last guess.
      if (game.currentGuess === maxGuesses - 1) {
        game.setGuessingMode(GuessingMode.Full);
      }

      logGuessToServer(game.puzzleId, constructCurrentGuess());
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
    sentenceGuesses: AlphabetChar[],
    currentGuess: number
  ) => {
    let blankIndex = -1;
    let didSolve = true;
    for (let char of game.phrase) {
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
      for (let char of game.phrase) {
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

      // Log stats to server.
      logStatsToServer(game.puzzleId, true, currentGuess).then(() => {
        game.setScoreLogged(true);
      });
      openResultsScreen(500);
    } else {
      if (currentGuess === maxGuesses) {
        game.setGameOver(true);
        logStatsToServer(
          game.puzzleId,
          false,
          didSolve ? currentGuess : undefined
        ).then(() => {
          game.setScoreLogged(true);
        });
        openResultsScreen(500);
      }
    }

    return didSolve;
  };

  const numBlanksInSentence = () => {
    let numBlanks = 0;
    for (let char of game.phrase) {
      char = char.toLowerCase();
      if (!isAlphabetChar(char) || game.guessedLetters.has(char)) {
        continue;
      }

      numBlanks++;
    }
    return numBlanks;
  };

  const constructCurrentGuess = () => {
    let guess = "";
    let blankIndex = -1;
    for (let char of game.phrase) {
      char = char.toLowerCase();
      if (!isAlphabetChar(char) || game.guessedLetters.has(char)) {
        guess += char;
      } else {
        blankIndex++;
        if (blankIndex < game.sentenceGuesses.length) {
          guess += game.sentenceGuesses[blankIndex];
        }
      }
    }
    return guess;
  };

  const jiggleSentence = () => {
    setSentenceJiggleTrigger((prev) => prev + 1);
  };

  const jiggleLetterPreview = () => {
    setPreviewJiggleTrigger((prev) => prev + 1);
  };

  const PopupScreenSwitch = () => {
    switch (popupScreen) {
      case PopupScreen.TUTORIAL:
        return (
          <TutorialScreen
            maxGuesses={maxGuesses}
            sentence={game.phrase}
            onClose={() => setPopupOpen(false)}
          />
        );
      case PopupScreen.RESULTS:
        return (
          <FinishScreen
            didWin={game.solved}
            guessCount={game.currentGuess - 1}
            guessHistory={game.guessHistory}
            maxGuesses={maxGuesses}
            sentence={game.phrase}
            puzzleNumber={game.puzzleNumber}
            puzzleId={game.puzzleId}
            scoreLogged={game.scoreLogged}
            addNotification={addNotification}
          />
        );
      default:
        return null;
    }
  };

  const openTutorialScreen = () => {
    setPopupScreen(PopupScreen.TUTORIAL);
    setPopupOpen(true);
  };

  const openResultsScreen = (delay?: number) => {
    setPopupScreen(PopupScreen.RESULTS);

    if (!delay) {
      setPopupOpen(true);
    } else {
      setTimeout(() => {
        setPopupOpen(true);
      }, 500);
    }
  };

  const addNotification = (message: string) => {
    setMessages((prevMessages) => {
      if (prevMessages.length === 0) {
        return [{ message, id: 0 }];
      }
      const lastId = prevMessages[prevMessages.length - 1].id;
      return [...prevMessages, { message, id: lastId + 1 }];
    });
  };

  const onNotificationEnd = () => {
    setMessages((prevMessages) => prevMessages.slice(1));
  };

  const submitButtonDisabled =
    (game.guessingMode === GuessingMode.Individual &&
      game.queuedLetter === null) ||
    (game.guessingMode === GuessingMode.Full &&
      game.sentenceGuesses.length < numBlanksInSentence()) ||
    game.gameOver;

  if (game.loading || popupScreen === PopupScreen.UNSET) {
    return (
      <HeaderTemplate>
        <Loading />
      </HeaderTemplate>
    );
  }

  let dateLabel: string | undefined;
  const today = new Date();
  if (game.puzzleDate.toDateString() !== today.toDateString()) {
    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
    };
    if (game.puzzleDate.getFullYear() !== today.getFullYear()) {
      options.year = "numeric";
    }
    dateLabel = game.puzzleDate.toLocaleDateString(undefined, options);
  }

  return (
    <HeaderTemplate
      onOpenHelp={openTutorialScreen}
      chipText={requestedId && "ARCHIVE"}
    >
      <main className="h-full flex flex-col">
        <div className="relative flex-1 flex flex-col items-center overflow-y-auto">
          {dateLabel && (
            <SmallChip className="absolute top-0 right-0 m-3" style="secondary">
              {dateLabel}
            </SmallChip>
          )}
          <Hint emojis={game.clue} guessingMode={game.guessingMode} />
          <div className="grow flex flex-col justify-center items-center max-h-[40rem]">
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
              sentence={game.phrase}
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
            gameOver={game.gameOver}
          />
          <div className="px-2 w-full flex justify-center">
            <Button
              variant="secondary"
              className={`${game.gameOver ? "" : "hidden"}`}
              onClick={() => openResultsScreen()}
            >
              Show Results
            </Button>
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
            submitDisabled={submitButtonDisabled}
          />
        </div>
        <Popup open={popupOpen} onClose={() => setPopupOpen(false)}>
          {PopupScreenSwitch()}
        </Popup>
        <Notifications messages={messages} onAnimationEnd={onNotificationEnd} />
      </main>
    </HeaderTemplate>
  );
}
