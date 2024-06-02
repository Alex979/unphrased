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
  const bgColor = userScore === numGuesses ? "bg-indigo-500" : "bg-zinc-600";

  return (
    <div className="flex items-center mr-5">
      <p className="w-3 mr-2 text-center text-sm font-bold">
        {numGuesses || "X"}
      </p>
      <div className="grow">
        <div className="flex items-center">
          <div
            className={`h-5 my-1 rounded ${bgColor} flex items-center justify-end`}
            style={{ minWidth: `${(percent / maxPercent) * 100}%` }}
          >
            {percent > 0 && (
              <p className="text-xs font-bold mx-2">{Math.round(percent)}%</p>
            )}
          </div>
        </div>
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
    <div className="my-4">
      <h2 className="text-sm font-bold my-2">STAT RANKINGS</h2>
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
