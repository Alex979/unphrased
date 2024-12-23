import { useEffect } from "react";
import { AlphabetChar, GuessingMode, isAlphabetChar } from "./types";

interface KeyboardRowProps {
  children?: React.ReactNode;
}

function KeyboardRow({ children }: KeyboardRowProps): JSX.Element {
  return <div className="grow flex">{children}</div>;
}

interface KeyboardButtonProps {
  children?: React.ReactNode;
  grow?: "0.5" | "1" | "1.5" | "2";
  fontSize?: "xs" | "sm" | "md" | "lg" | "xl";
  onClick?: () => void;
  guessed: boolean;
  highlight?: boolean;
  disabled?: boolean;
  guessingMode?: GuessingMode;
}

function KeyboardButton({
  children,
  grow = "1",
  fontSize = "xl",
  onClick,
  guessed,
  highlight,
  disabled,
  guessingMode,
}: KeyboardButtonProps): JSX.Element {
  const checkTouchDevice = () => {
    return "ontouchstart" in window;
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    // Don't execute click events on touch devices.
    if (checkTouchDevice()) {
      event.preventDefault();
      return;
    }

    // Blur the button to prevent focus outline from sticking around, only when it was a mouse click.
    if (event.detail !== 0) {
      event.currentTarget.blur();
    }

    if (onClick) {
      onClick();
    }
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLButtonElement>) => {
    // Don't execute touch events on non-touch devices.
    if (!checkTouchDevice()) {
      event.preventDefault();
      return;
    }

    if (onClick) {
      onClick();
    }
  };

  // Don't allow "Enter" key to trigger clicks, since this is the submit key.
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  const growClass =
    grow === "0.5"
      ? "flex-[0.5_1_0%]"
      : grow === "1"
      ? "flex-[1_1_0%]"
      : grow === "1.5"
      ? "flex-[1.5_1_0%]"
      : "flex-[2_1_0%]";

  const fontSizeClass =
    fontSize === "xs"
      ? "text-xs"
      : fontSize === "sm"
      ? "text-sm"
      : fontSize === "md"
      ? "text-md"
      : fontSize === "lg"
      ? "text-lg"
      : "text-xl";

  const colorClassDefault = `${
    guessed
      ? "bg-slate-500 dark:bg-neutral-800 text-white"
      : "bg-slate-300 dark:bg-neutral-500"
  } active:bg-slate-400 dark:active:bg-neutral-600`;

  const colorClassHighlight =
    guessingMode === GuessingMode.Full
      ? `bg-pink-500 active:bg-pink-700 text-white`
      : `bg-indigo-500 active:bg-indigo-700 text-white`;

  const colorClassDisabled =
    "bg-slate-200 text-slate-400 dark:bg-neutral-700 dark:text-neutral-400";

  const colorClass = disabled
    ? colorClassDisabled
    : highlight
    ? colorClassHighlight
    : colorClassDefault;

  return (
    <button
      className={`${growClass} p-0.5`}
      onClick={handleClick}
      onTouchEnd={handleTouchEnd}
      onKeyDown={handleKeyDown}
    >
      <div
        className={`${colorClass} rounded w-full h-full flex items-center justify-center font-bold shadow-sm ${fontSizeClass}`}
      >
        {children}
      </div>
    </button>
  );
}

interface VirtualKeyboardProps {
  onLetterPress: (letter: AlphabetChar) => void;
  onBackspace: () => void;
  onEnter: () => void;
  guessedLetters: Set<AlphabetChar>;
  guessingMode: GuessingMode;
  submitDisabled: boolean;
}

export default function VirtualKeyboard({
  onLetterPress,
  onBackspace,
  onEnter,
  guessedLetters,
  guessingMode,
  submitDisabled,
}: VirtualKeyboardProps) {
  // Listen for keyboard events for desktop users to optionally use
  // their real keyboard.
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      if (isAlphabetChar(key)) {
        onLetterPress(key);
      } else if (key === "enter") {
        onEnter();
      } else if (key === "backspace") {
        onBackspace();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onLetterPress, onBackspace, onEnter]);

  return (
    <div className="w-full max-w-xl h-40 flex flex-col p-1.5">
      <KeyboardRow>
        {Array.from("qwertyuiop").map((letter) => (
          <KeyboardButton
            key={letter}
            onClick={() => onLetterPress(letter as AlphabetChar)}
            guessed={guessedLetters.has(letter as AlphabetChar)}
          >
            {letter.toUpperCase()}
          </KeyboardButton>
        ))}
      </KeyboardRow>
      <KeyboardRow>
        <div className="flex-[0.5_1_0%]"></div>
        {Array.from("asdfghjkl").map((letter) => (
          <KeyboardButton
            key={letter}
            onClick={() => onLetterPress(letter as AlphabetChar)}
            guessed={guessedLetters.has(letter as AlphabetChar)}
          >
            {letter.toUpperCase()}
          </KeyboardButton>
        ))}
        <div className="flex-[0.5_1_0%]"></div>
      </KeyboardRow>
      <KeyboardRow>
        <KeyboardButton
          grow="2"
          fontSize="xs"
          onClick={() => onEnter()}
          guessed={false}
          highlight
          disabled={submitDisabled}
          guessingMode={guessingMode}
        >
          SUBMIT
        </KeyboardButton>
        {Array.from("zxcvbnm").map((letter) => (
          <KeyboardButton
            key={letter}
            onClick={() => onLetterPress(letter as AlphabetChar)}
            guessed={guessedLetters.has(letter as AlphabetChar)}
          >
            {letter.toUpperCase()}
          </KeyboardButton>
        ))}
        <KeyboardButton
          grow="1.5"
          onClick={() => onBackspace()}
          guessed={false}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9.75 14.25 12m0 0 2.25 2.25M14.25 12l2.25-2.25M14.25 12 12 14.25m-2.58 4.92-6.374-6.375a1.125 1.125 0 0 1 0-1.59L9.42 4.83c.21-.211.497-.33.795-.33H19.5a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25h-9.284c-.298 0-.585-.119-.795-.33Z"
            />
          </svg>
        </KeyboardButton>
      </KeyboardRow>
    </div>
  );
}
