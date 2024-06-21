import { getFingerprint } from "@thumbmarkjs/thumbmarkjs";
import { sendGAEvent } from "@next/third-parties/google";
import { isStatRankingsResponse } from "../types";

export async function logStatsToServer(
  puzzleId: string,
  solved: boolean,
  numGuesses?: number
) {
  sendGAEvent("event", "puzzle_finished", {
    puzzle_id: puzzleId,
    solved,
    num_guesses: numGuesses,
  });

  const fingerprint = await getFingerprint();
  await fetch("/api/log-stats", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fingerprint,
      puzzleId,
      solved,
      numGuesses,
    }),
  });
}

export async function logGuessToServer(puzzleId: string, guess: string) {
  const fingerprint = await getFingerprint();
  await fetch("/api/log-guess", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fingerprint,
      puzzleId,
      guess,
    }),
  });
}

export async function fetchStatRankings(puzzleId: string) {
  const response = await fetch("/api/stat-rankings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: puzzleId }),
  });
  const data = await response.json();

  if (!isStatRankingsResponse(data)) {
    return null;
  }
  return data;
}
