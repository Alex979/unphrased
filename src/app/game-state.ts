import { useEffect, useRef, useState } from "react";
import { AlphabetChar, GuessingMode, isTodaysPuzzleResponse } from "./types";
import { useSearchParams } from "next/navigation";

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

function gameStateKey(puzzleId: string) {
  return `game-${puzzleId}`;
}

function storeLocalGameState(puzzleId: string, gameState: StoredGameState) {
  if (!localStorageAvailable()) {
    return;
  }

  const key = gameStateKey(puzzleId);
  localStorage.setItem(key, JSON.stringify(gameState));
}

function loadLocalGameState(puzzleId: string): StoredGameState | null {
  if (!localStorageAvailable()) {
    return null;
  }

  const key = gameStateKey(puzzleId);
  const storedGameState = localStorage.getItem(key);
  if (storedGameState === null) {
    return null;
  }
  return JSON.parse(storedGameState);
}

function useGameState() {
  const [puzzleId, setPuzzleId] = useState("");
  const [puzzleNumber, setPuzzleNumber] = useState(0);
  const [phrase, setPhrase] = useState("");
  const [clue, setClue] = useState("");

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

  const [scoreLogged, setScoreLogged] = useState(false);

  const queryParams = useSearchParams();

  const addGuessHistory = (guess: boolean) => {
    setGuessHistory((prevGuessHistory) => {
      return [...prevGuessHistory, guess];
    });
  };

  const addGuessedLetter = (letter: AlphabetChar) => {
    setGuessedLetters((prevGuessedLetters) => {
      const newGuessedLetters = new Set(prevGuessedLetters);
      newGuessedLetters.add(letter);
      return newGuessedLetters;
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
    (async () => {
      // Fetch today's puzzle from the server.
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const forceTimeZone = queryParams.get("tz");
      const response = await fetch("/api/todays-puzzle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ timeZone: forceTimeZone || timeZone }),
        cache: "no-store",
      });
      const data = await response.json();
      if (!isTodaysPuzzleResponse(data)) {
        console.error("Invalid response from server.");
        return;
      }

      setPuzzleId(data.id);
      setPuzzleNumber(data.number);
      setPhrase(data.phrase);
      setClue(data.clue);

      const storedGameState = loadLocalGameState(data.id);

      if (storedGameState) {
        setCurrentGuess(storedGameState.currentGuess);
        setGuessHistory(storedGameState.guessHistory);
        setGuessedLetters(new Set(storedGameState.guessedLetters));
        setGameOver(storedGameState.gameOver);
        setSolved(storedGameState.solved);
        setScoreLogged(storedGameState.gameOver);
      }

      setLoading(false);
    })();
  }, [queryParams]);

  // Update locally stored game state whenever it changes.
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    storeLocalGameState(puzzleId, {
      currentGuess,
      guessHistory,
      guessedLetters: Array.from(guessedLetters),
      gameOver,
      solved,
    });
  }, [puzzleId, currentGuess, guessHistory, guessedLetters, gameOver, solved]);

  return {
    puzzleId,
    puzzleNumber,
    phrase,
    clue,
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
    addGuessedLetter,
    sentenceGuesses,
    setSentenceGuesses,
    addSentenceGuess,
    popSentenceGuess,
    gameOver,
    setGameOver,
    solved,
    setSolved,
    loading,
    scoreLogged,
    setScoreLogged,
  };
}

export { useGameState };
