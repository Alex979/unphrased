import { useEffect, useRef, useState } from "react";
import { AlphabetChar, GuessingMode } from "./types";

const GAME_STATE_VERSION = "v1";

interface StoredGameState {
  currentGuess: number;
  guessHistory: boolean[];
  guessedLetters: AlphabetChar[];
  gameOver: boolean;
  solved: boolean;
}

// From https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
function localStorageAvailable() {
  let storage;
  try {
    storage = window.localStorage;
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      // everything except Firefox
      (e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === "QuotaExceededError" ||
        // Firefox
        e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}

function formatDateAsYYYYMMDD(date: Date) {
  const year = date.getFullYear();
  // Add 1 to month because getMonth() returns a zero-based index.
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function constructTodaysGameStateKey() {
  // Fetch today's date.
  const today = new Date();
  // Format as string in user's time zone: YYYY-MM-DD.
  const dateString = formatDateAsYYYYMMDD(today);
  // Construct key for localStorage.
  const key = `game-${GAME_STATE_VERSION}-${dateString}`;
  return key;
}

function storeLocalGameState(gameState: StoredGameState) {
  if (!localStorageAvailable()) {
    return;
  }

  const key = constructTodaysGameStateKey();
  localStorage.setItem(key, JSON.stringify(gameState));
}

function loadLocalGameState(): StoredGameState | null {
  if (!localStorageAvailable()) {
    return null;
  }

  const key = constructTodaysGameStateKey();
  const storedGameState = localStorage.getItem(key);
  if (storedGameState === null) {
    return null;
  }
  return JSON.parse(storedGameState);
}

function useGameState() {
  const [currentGuess, setCurrentGuess] = useState(1);
  const [guessHistory, setGuessHistory] = useState<boolean[]>([]);
  const [guessingMode, setGuessingMode] = useState<GuessingMode>(
    GuessingMode.Individual
  );
  const [queuedLetter, setQueuedLetter] = useState<AlphabetChar | null>(null);
  const [guessedLetters, setGuessedLetters] = useState<Set<AlphabetChar>>(
    new Set([])
  );
  const [sentenceGuesses, setSentenceGuesses] = useState<AlphabetChar[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [solved, setSolved] = useState(false);

  const [loading, setLoading] = useState(true);

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

  // Used to ensure game state is not stored on first render.
  const firstUpdate = useRef(true);

  // Load game state from local storage.
  useEffect(() => {
    const storedGameState = loadLocalGameState();

    if (storedGameState) {
      setCurrentGuess(storedGameState.currentGuess);
      setGuessHistory(storedGameState.guessHistory);
      setGuessedLetters(new Set(storedGameState.guessedLetters));
      setGameOver(storedGameState.gameOver);
      setSolved(storedGameState.solved);
    }

    setLoading(false);
  }, []);

  // Update locally stored game state whenever it changes.
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    storeLocalGameState({
      currentGuess,
      guessHistory,
      guessedLetters: Array.from(guessedLetters),
      gameOver,
      solved,
    });
  }, [currentGuess, guessHistory, guessedLetters, gameOver, solved]);

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
    loading,
  };
}

export { useGameState };
