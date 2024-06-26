export type AlphabetChar =
  | "a"
  | "b"
  | "c"
  | "d"
  | "e"
  | "f"
  | "g"
  | "h"
  | "i"
  | "j"
  | "k"
  | "l"
  | "m"
  | "n"
  | "o"
  | "p"
  | "q"
  | "r"
  | "s"
  | "t"
  | "u"
  | "v"
  | "w"
  | "x"
  | "y"
  | "z";

export function isAlphabetChar(char: string): char is AlphabetChar {
  return /^[a-z]$/.test(char);
}

export enum GuessingMode {
  Individual,
  Full,
}

export enum PopupScreen {
  UNSET,
  TUTORIAL,
  RESULTS,
}

export interface LogStatsRequest {
  fingerprint: string;
  puzzleId: string;
  solved: boolean;
  numGuesses?: number;
}

export function isLogStatsRequest(obj: any): obj is LogStatsRequest {
  return (
    obj &&
    typeof obj.fingerprint === "string" &&
    typeof obj.puzzleId === "string" &&
    typeof obj.solved === "boolean" &&
    (obj.numGuesses === undefined || typeof obj.numGuesses === "number")
  );
}

export interface LogGuessRequest {
  fingerprint: string;
  puzzleId: string;
  guess: string;
}

export function isLogGuessRequest(obj: any): obj is LogGuessRequest {
  return (
    obj &&
    typeof obj.fingerprint === "string" &&
    typeof obj.puzzleId === "string" &&
    typeof obj.guess === "string"
  );
}

export interface PuzzleRequest {
  timeZone: string;
  puzzleId?: string;
}

export function isPuzzleRequest(obj: any): obj is PuzzleRequest {
  return (
    obj &&
    typeof obj.timeZone === "string" &&
    (obj.puzzleId === undefined || typeof obj.puzzleId === "string")
  );
}

export interface PuzzleResponse {
  id: string;
  number: number;
  date: string;
  phrase: string;
  clue: string;
}

export function isPuzzleResponse(obj: any): obj is PuzzleResponse {
  return (
    obj &&
    typeof obj.id === "string" &&
    typeof obj.number === "number" &&
    typeof obj.date === "string" &&
    typeof obj.phrase === "string" &&
    typeof obj.clue === "string"
  );
}

interface StatRankingsRequest {
  id: string;
}

export function isStatRankingsRequest(obj: any): obj is StatRankingsRequest {
  return obj && typeof obj.id === "string";
}

interface StatRankingsResponseRow {
  num_guesses: number | null;
  percent: number;
}

function isStatRankingsResponseRow(obj: any): obj is StatRankingsResponseRow {
  return (
    obj &&
    (typeof obj.num_guesses === "number" || obj.num_guesses === null) &&
    typeof obj.percent === "number"
  );
}

export type StatRankingsResponse = StatRankingsResponseRow[];

export function isStatRankingsResponse(obj: any): obj is StatRankingsResponse {
  return Array.isArray(obj) && obj.every(isStatRankingsResponseRow);
}
