interface ShowResultsButtonProps {
  className?: string;
  onClick?: () => void;
}

export default function ShowResultsButton({
  className,
  onClick,
}: ShowResultsButtonProps) {
  return (
    <button
      onClick={() => onClick && onClick()}
      className={`border border-gray-700 dark:border-zinc-700 active:bg-gray-200 dark:active:bg-zinc-800 rounded-full font-bold py-2 px-6 shadow-sm ${
        className || ""
      }`}
    >
      Show Results
    </button>
  );
}
