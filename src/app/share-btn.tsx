import { useState } from "react";

interface ShareButtonProps {
  className?: string;
  guessHistory: boolean[];
  maxGuesses: number;
  puzzleNumber: number;
}

export default function ShareButton({
  className,
  guessHistory,
  maxGuesses,
  puzzleNumber,
}: ShareButtonProps) {
  const [showClipboardText, setShowClipboardText] = useState(false);

  const handleShare = () => {
    const guessString = guessHistory
      .map((guess) => {
        return guess ? "✅" : "❌";
      })
      .join("");
    const numGuesses = guessHistory[guessHistory.length - 1] ? guessHistory.length : 'X';
    const shareString = `Unphrased\nPuzzle #${puzzleNumber} ${numGuesses}/${maxGuesses}\n${guessString}\nwww.unphrased.app`;
    navigator.clipboard.writeText(shareString);
    setShowClipboardText(true);
  };

  return (
    <div className={`flex flex-col items-center space-y-3 ${className || ""}`}>
      <button
        onClick={handleShare}
        className={`border border-gray-700 dark:border-zinc-700 active:bg-gray-200 dark:active:bg-zinc-800 rounded-full font-bold py-2 px-5 shadow-sm flex items-center justify-center`}
      >
        Share results{" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5 ml-2"
        >
          <path d="M9.25 13.25a.75.75 0 0 0 1.5 0V4.636l2.955 3.129a.75.75 0 0 0 1.09-1.03l-4.25-4.5a.75.75 0 0 0-1.09 0l-4.25 4.5a.75.75 0 1 0 1.09 1.03L9.25 4.636v8.614Z" />
          <path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" />
        </svg>
      </button>
      <p className={showClipboardText ? "" : "invisible"}>
        Copied to clipboard!
      </p>
    </div>
  );
}
