import { getFingerprint } from "@thumbmarkjs/thumbmarkjs";

export function logStatsToServer(
  puzzleId: string,
  solved: boolean,
  numGuesses?: number
) {
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
