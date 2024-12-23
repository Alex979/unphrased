import { useEffect, useRef, useState } from "react";
import { AlphabetChar, GuessingMode, isPuzzleResponse } from "./types";
import { useSearchParams } from "next/navigation";
import { localStorageAvailable } from "./lib/localstorage";

interface StoredGameState {
  currentGuess: number;
  guessHistory: boolean[];
  guessedLetters: AlphabetChar[];
  gameOver: boolean;
  solved: boolean;
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

export function loadLocalGameState(puzzleId: string): StoredGameState | null {
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

function useGameState(requestedId?: string) {
  const [puzzleId, setPuzzleId] = useState("");
  const [puzzleNumber, setPuzzleNumber] = useState(0);
  const [phrase, setPhrase] = useState("");
  const [clue, setClue] = useState("");
  const [puzzleDate, setPuzzleDate] = useState(new Date());

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
  const [notFound, setNotFound] = useState(false);

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
      const response = await fetch("/api/puzzle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          timeZone: forceTimeZone || timeZone,
          puzzleId: requestedId,
        }),
        cache: "no-store",
      });

      if (response.status === 404) {
        setNotFound(true);
        return;
      }

      const data = await response.json();
      if (!isPuzzleResponse(data)) {
        console.error("Invalid response from server.");
        return;
      }

      setPuzzleId(data.id);
      setPuzzleNumber(data.number);
      setPhrase(data.phrase);
      setClue(data.clue);
      const [year, month, day] = data.date.split('-').map(Number);
      setPuzzleDate(new Date(year, month - 1, day));

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
  }, [queryParams, requestedId]);

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
    puzzleDate,
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
    notFound,
    scoreLogged,
    setScoreLogged,
  };
}

export { useGameState };
