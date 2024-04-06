import { useEffect } from "react";
import { AlphabetChar, isAlphabetChar } from "./types";

interface KeyboardRowProps {
  children?: React.ReactNode;
}

function KeyboardRow({ children }: KeyboardRowProps): JSX.Element {
  return <div className="grow flex gap-2">{children}</div>;
}

interface KeyboardButtonProps {
  children?: React.ReactNode;
  grow?: "0.5" | "1" | "1.5";
  fontSize?: "xs" | "sm" | "md" | "lg" | "xl";
  onClick?: () => void;
}

function KeyboardButton({
  children,
  grow = "1",
  fontSize = "xl",
  onClick,
}: KeyboardButtonProps): JSX.Element {
  const growClass =
    grow === "0.5"
      ? "flex-[0.5_1_0%]"
      : grow === "1"
      ? "flex-[1_1_0%]"
      : "flex-[1.5_1_0%]";

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

  return (
    <button
      className={`bg-slate-300 active:bg-slate-400 rounded ${growClass} flex items-center justify-center ${fontSizeClass} font-bold`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

interface VirtualKeyboardProps {
  onLetterPress: (letter: AlphabetChar) => void;
  onBackspace: () => void;
  onEnter: () => void;
}

export default function VirtualKeyboard({
  onLetterPress,
  onBackspace,
  onEnter,
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
    <div className="w-full max-w-xl h-56 flex flex-col p-2 gap-2">
      <KeyboardRow>
        <KeyboardButton onClick={() => onLetterPress("q")}>Q</KeyboardButton>
        <KeyboardButton onClick={() => onLetterPress("w")}>W</KeyboardButton>
        <KeyboardButton onClick={() => onLetterPress("e")}>E</KeyboardButton>
        <KeyboardButton onClick={() => onLetterPress("r")}>R</KeyboardButton>
        <KeyboardButton onClick={() => onLetterPress("t")}>T</KeyboardButton>
        <KeyboardButton onClick={() => onLetterPress("y")}>Y</KeyboardButton>
        <KeyboardButton onClick={() => onLetterPress("u")}>U</KeyboardButton>
        <KeyboardButton onClick={() => onLetterPress("i")}>I</KeyboardButton>
        <KeyboardButton onClick={() => onLetterPress("o")}>O</KeyboardButton>
        <KeyboardButton onClick={() => onLetterPress("p")}>P</KeyboardButton>
      </KeyboardRow>
      <KeyboardRow>
        <div className="flex-[0.5_1_0%]"></div>
        <KeyboardButton onClick={() => onLetterPress("a")}>A</KeyboardButton>
        <KeyboardButton onClick={() => onLetterPress("s")}>S</KeyboardButton>
        <KeyboardButton onClick={() => onLetterPress("d")}>D</KeyboardButton>
        <KeyboardButton onClick={() => onLetterPress("f")}>F</KeyboardButton>
        <KeyboardButton onClick={() => onLetterPress("g")}>G</KeyboardButton>
        <KeyboardButton onClick={() => onLetterPress("h")}>H</KeyboardButton>
        <KeyboardButton onClick={() => onLetterPress("j")}>J</KeyboardButton>
        <KeyboardButton onClick={() => onLetterPress("k")}>K</KeyboardButton>
        <KeyboardButton onClick={() => onLetterPress("l")}>L</KeyboardButton>
        <div className="flex-[0.5_1_0%]"></div>
      </KeyboardRow>
      <KeyboardRow>
        <KeyboardButton grow="1.5" fontSize="xs" onClick={() => onEnter()}>
          ENTER
        </KeyboardButton>
        <KeyboardButton onClick={() => onLetterPress("z")}>Z</KeyboardButton>
        <KeyboardButton onClick={() => onLetterPress("x")}>X</KeyboardButton>
        <KeyboardButton onClick={() => onLetterPress("c")}>C</KeyboardButton>
        <KeyboardButton onClick={() => onLetterPress("v")}>V</KeyboardButton>
        <KeyboardButton onClick={() => onLetterPress("b")}>B</KeyboardButton>
        <KeyboardButton onClick={() => onLetterPress("n")}>N</KeyboardButton>
        <KeyboardButton onClick={() => onLetterPress("m")}>M</KeyboardButton>
        <KeyboardButton grow="1.5" onClick={() => onBackspace()}>
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
