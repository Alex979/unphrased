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

export interface TodaysPuzzleRequest {
  timeZone: string;
}

export function isTodaysPuzzleRequest(obj: any): obj is TodaysPuzzleRequest {
  return obj && typeof obj.timeZone === "string";
}

export interface TodaysPuzzleResponse {
  id: string;
  number: number;
  date: string;
  phrase: string;
  clue: string;
}

export function isTodaysPuzzleResponse(obj: any): obj is TodaysPuzzleResponse {
  return (
    obj &&
    typeof obj.id === "string" &&
    typeof obj.number === "number" &&
    typeof obj.date === "string" &&
    typeof obj.phrase === "string" &&
    typeof obj.clue === "string"
  );
}
