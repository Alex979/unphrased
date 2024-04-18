import { getFingerprint } from "@thumbmarkjs/thumbmarkjs";
import { sendGAEvent } from "@next/third-parties/google";

export function logStatsToServer(
  puzzleId: string,
  solved: boolean,
  numGuesses?: number
) {
  sendGAEvent({
    event: 'puzzle_finished',
    puzzle_id: puzzleId,
    solved,
    num_guesses: numGuesses,
  });
  
  getFingerprint().then((fingerprint) => {
    fetch("/api/log-stats", {
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
  });
}
