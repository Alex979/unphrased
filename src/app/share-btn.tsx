import Button from "./_components/button";
import { isMobile } from "react-device-detect";

interface ShareButtonProps {
  className?: string;
  guessHistory: boolean[];
  maxGuesses: number;
  puzzleNumber: number;
  addNotification: (message: string) => void;
}

export default function ShareButton({
  className,
  guessHistory,
  maxGuesses,
  puzzleNumber,
  addNotification,
}: ShareButtonProps) {
  const copyToClipboard = (shareString: string) => {
    navigator.clipboard.writeText(shareString);
    addNotification("Results copied to clipboard");
  };

  const shareNatively = async (shareString: string) => {
    await navigator.share({
      text: shareString,
    });
  };

  const handleShare = async () => {
    const guessString = guessHistory
      .map((guess) => {
        return guess ? "✅" : "❌";
      })
      .join("");
    const numGuesses = guessHistory[guessHistory.length - 1]
      ? guessHistory.length
      : "X";
    const shareString = `Unphrased\nPuzzle #${puzzleNumber} ${numGuesses}/${maxGuesses}\n${guessString}\nwww.unphrased.app`;

    if (isMobile) {
      // Attempt using share API, otherwise fallback to clipboard
      try {
        await shareNatively(shareString);
      } catch (err) {
        copyToClipboard(shareString);
      }
    } else {
      copyToClipboard(shareString);
    }
  };

  return (
    <Button
      className={`flex items-center justify-center ${className || ""}`}
      onClick={handleShare}
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
    </Button>
  );
}
