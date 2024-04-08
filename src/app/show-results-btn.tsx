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
      onClick={onClick}
      className={`border border-gray-700 active:bg-gray-200 rounded-full font-bold py-2 px-4 shadow-sm ${
        className || ""
      }`}
    >
      Show Results
    </button>
  );
}
