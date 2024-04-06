function KeyboardRow({
  children,
}: {
  children?: React.ReactNode;
}): JSX.Element {
  return <div className="grow flex gap-2">{children}</div>;
}

function KeyboardButton({
  children,
  grow = "1",
  fontSize = "xl",
}: {
  children?: React.ReactNode;
  grow?: "0.5" | "1" | "1.5";
  fontSize?: "xs" | "sm" | "md" | "lg" | "xl";
}): JSX.Element {
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
    <div
      className={`bg-blue-500 ${growClass} flex items-center justify-center ${fontSizeClass} font-bold`}
    >
      {children}
    </div>
  );
}

export default function VirtualKeyboard() {
  return (
    <div className="w-full h-56 flex flex-col bg-red-500 p-2 gap-2">
      <KeyboardRow>
        <KeyboardButton>Q</KeyboardButton>
        <KeyboardButton>W</KeyboardButton>
        <KeyboardButton>E</KeyboardButton>
        <KeyboardButton>R</KeyboardButton>
        <KeyboardButton>T</KeyboardButton>
        <KeyboardButton>Y</KeyboardButton>
        <KeyboardButton>U</KeyboardButton>
        <KeyboardButton>I</KeyboardButton>
        <KeyboardButton>O</KeyboardButton>
        <KeyboardButton>P</KeyboardButton>
      </KeyboardRow>
      <KeyboardRow>
        <div className="flex-[0.5_1_0%]"></div>
        <KeyboardButton>A</KeyboardButton>
        <KeyboardButton>S</KeyboardButton>
        <KeyboardButton>D</KeyboardButton>
        <KeyboardButton>F</KeyboardButton>
        <KeyboardButton>G</KeyboardButton>
        <KeyboardButton>H</KeyboardButton>
        <KeyboardButton>J</KeyboardButton>
        <KeyboardButton>K</KeyboardButton>
        <KeyboardButton>L</KeyboardButton>
        <div className="flex-[0.5_1_0%]"></div>
      </KeyboardRow>
      <KeyboardRow>
        <KeyboardButton grow="1.5" fontSize="xs">
          ENTER
        </KeyboardButton>
        <KeyboardButton>Z</KeyboardButton>
        <KeyboardButton>X</KeyboardButton>
        <KeyboardButton>C</KeyboardButton>
        <KeyboardButton>V</KeyboardButton>
        <KeyboardButton>B</KeyboardButton>
        <KeyboardButton>N</KeyboardButton>
        <KeyboardButton>M</KeyboardButton>
        <KeyboardButton grow="1.5">
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
