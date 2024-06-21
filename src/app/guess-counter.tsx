interface GuessCounterProps {
  currentGuess: number;
  maxGuesses: number;
  gameOver: boolean;
}

export default function GuessCounter({
  currentGuess,
  maxGuesses,
  gameOver,
}: GuessCounterProps) {
  const isFinalGuess = currentGuess === maxGuesses;

  return (
    <div className={`flex items-center h-8 ${gameOver ? "invisible" : ""}`}>
      <p className="text-slate-600 dark:text-neutral-300 mr-2">
        {isFinalGuess ? "Last guess!" : "Remaining: "}
      </p>
      {!isFinalGuess &&
        Array.from({ length: maxGuesses - currentGuess + 1 }).map(
          (_, index) => (
            <p
              key={index}
              className="text-2xl text-slate-600 dark:text-neutral-300"
            >
              •
            </p>
          )
        )}
    </div>
  );
}
