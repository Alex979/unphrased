"use client";

import { useEffect, useState } from "react";
import { StatRankingsResponse } from "./types";
import { fetchStatRankings } from "./lib/api";

interface RankingBarProps {
  label: string;
  highlight: boolean;
  percent: number;
  widthPercent: number;
  loading?: boolean;
}

function RankingBar({
  label,
  highlight,
  percent,
  widthPercent,
  loading,
}: RankingBarProps) {
  const bgColor = loading
    ? "bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300 dark:from-neutral-800 dark:via-neutral-700 dark:to-neutral-800 bg-[length:200%] animate-loading-gradient"
    : highlight
    ? "bg-indigo-500"
    : "bg-gray-400 dark:bg-neutral-600";

  return (
    <div className="flex items-center mr-5">
      <p className="w-3 mr-2 text-center text-sm font-bold">{label}</p>
      <div className="grow">
        <div className="flex items-center">
          <div
            className={`h-5 my-1 rounded ${bgColor} flex items-center justify-end text-white`}
            style={{
              minWidth: `${widthPercent}%`,
            }}
          >
            {percent > 0 && !loading && (
              <p className="text-xs font-bold mx-2">{Math.round(percent)}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

interface StatRankingsProps {
  puzzleId: string;
  userGuesses: number;
  didWin: boolean;
  scoreLogged: boolean;
}

export default function StatRankings({
  puzzleId,
  userGuesses,
  didWin,
  scoreLogged,
}: StatRankingsProps) {
  const [statRankings, setStatRankings] = useState<StatRankingsResponse | null>(
    null
  );

  useEffect(() => {
    if (!puzzleId || !scoreLogged) {
      return;
    }

    (async () => {
      const data = await fetchStatRankings(puzzleId);
      setStatRankings(data);
    })();
  }, [puzzleId, scoreLogged]);

  const loading = statRankings === null;

  const maxPercent = loading
    ? 100
    : Math.max(...statRankings.map((ranking) => ranking.percent));

  return (
    <div className="my-6">
      <h2 className="text-sm font-bold my-2">LEADERBOARD</h2>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <RankingBar
          key={i}
          label={i < 8 ? `${i + 1}` : "X"}
          percent={loading ? 100 : statRankings[i].amount}
          widthPercent={
            loading ? 100 : (statRankings[i].percent / maxPercent) * 100
          }
          highlight={
            loading
              ? false
              : didWin
              ? statRankings[i].num_guesses === userGuesses
              : statRankings[i].num_guesses === null
          }
          loading={loading}
        />
      ))}
    </div>
  );
}
