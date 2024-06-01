interface RankingBarProps {
  numGuesses: number | null;
  percent: number;
  maxPercent: number;
  userScore: number;
}

function RankingBar({
  numGuesses,
  percent,
  maxPercent,
  userScore,
}: RankingBarProps) {
  const bgColor = userScore === numGuesses ? "bg-zinc-400" : "bg-zinc-600";

  return (
    <div className="flex items-center">
      <p className="w-8 text-center">{numGuesses || "X"}</p>
      <div className="grow">
        <div
          className={`h-6 my-1 rounded ${bgColor}`}
          style={{ width: `${(percent / maxPercent) * 100}%` }}
        ></div>
      </div>
    </div>
  );
}

export default function StatRankings() {
  const rankings = [
    { num_guesses: 1, percent: 23.809523809523809524 },
    { num_guesses: 2, percent: 19.047619047619047619 },
    { num_guesses: 3, percent: 0.0 },
    { num_guesses: 4, percent: 0.0 },
    { num_guesses: 5, percent: 4.761904761904761905 },
    { num_guesses: 6, percent: 14.285714285714285714 },
    { num_guesses: 7, percent: 9.52380952380952381 },
    { num_guesses: 8, percent: 19.047619047619047619 },
    { num_guesses: null, percent: 9.52380952380952381 },
  ];

  const maxPercent = Math.max(...rankings.map((ranking) => ranking.percent));

  const userScore = 5;

  return (
    <div className="w-full bg-zinc-800 py-4 pr-4 rounded my-4">
      {rankings.map((ranking, index) => (
        <RankingBar
          key={index}
          numGuesses={ranking.num_guesses}
          percent={ranking.percent}
          maxPercent={maxPercent}
          userScore={userScore}
        />
      ))}
    </div>
  );
}
