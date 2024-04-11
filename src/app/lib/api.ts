import { getCurrentBrowserFingerPrint } from "@rajesh896/broprint.js";

export function logStatsToServer(
  puzzleId: string,
  solved: boolean,
  numGuesses?: number
) {
  getCurrentBrowserFingerPrint().then((fingerprint) => {
    fetch("/api/log-stats", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fingerprint: `${fingerprint}`,
        puzzleId,
        solved,
        numGuesses,
      }),
    });
  });
}
