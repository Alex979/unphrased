interface GuessCounterProps {
  currentGuess: number;
  maxGuesses: number;
}

export default function GuessCounter({
  currentGuess,
  maxGuesses,
}: GuessCounterProps) {
  return (
    <div className="flex items-center h-8">
      <p className="text-slate-600 dark:text-zinc-300 mr-2">Remaining: </p>
      {Array.from({ length: maxGuesses - currentGuess + 1 }).map((_, index) => (
        <p key={index} className="text-2xl text-slate-600 dark:text-zinc-300">•</p>
      ))}
    </div>
  );
}
