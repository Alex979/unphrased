interface GuessCounterProps {
  currentGuess: number;
  maxGuesses: number;
}

export default function GuessCounter({
  currentGuess,
  maxGuesses,
}: GuessCounterProps) {
  return (
    <div className="flex">
      {Array.from({ length: maxGuesses - currentGuess + 1 }).map((_, index) => (
        <p key={index} className="text-2xl text-slate-500">•</p>
      ))}
    </div>
  );
}
