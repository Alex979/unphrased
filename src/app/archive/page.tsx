"use client";

import { useEffect, useRef, useState } from "react";
import Select from "../_components/select";
import HeaderTemplate from "../header-template";
import { Roboto_Slab } from "next/font/google";
import { ArchiveResponseRow } from "../types";
import { fetchArchive } from "../lib/api";
import { formatDateYYYYMMDD } from "../lib/date-utils";
import { loadLocalGameState } from "../game-state";
import Link from "next/link";

const robotoSlab = Roboto_Slab({ subsets: ["latin"] });

function getColStart(i: number) {
  if (i === 0) {
    return "col-start-1";
  }
  if (i === 1) {
    return "col-start-2";
  }
  if (i === 2) {
    return "col-start-3";
  }
  if (i === 3) {
    return "col-start-4";
  }
  if (i === 4) {
    return "col-start-5";
  }
  if (i === 5) {
    return "col-start-6";
  }
  if (i === 6) {
    return "col-start-7";
  }
  return "";
}

function getMonthString(month: number) {
  return new Date(2024, month - 1).toLocaleString("default", { month: "long" });
}

interface PuzzleCalendarProps {
  year: number;
  month: number;
  getDateTile: (date: Date) => React.ReactNode;
}

function PuzzleCalendar({ getDateTile, year, month }: PuzzleCalendarProps) {
  const startDate = new Date(year, month - 1, 1);

  const monthStartIndex = startDate.getDay();
  const numDays = new Date(year, month, 0).getDate();

  const dateGrid = [];
  for (let i = 0; i < numDays; i++) {
    let colStart = "";
    if (i === 0) {
      colStart = getColStart(monthStartIndex);
    }
    dateGrid.push(
      <div className={`${colStart}`} key={i}>
        {getDateTile(new Date(year, month - 1, i + 1))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-7">
      {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
        <div
          key={index}
          className="border-b border-gray-300 dark:border-neutral-700 text-center"
        >
          {day}
        </div>
      ))}
      {dateGrid}
    </div>
  );
}

function NavButton({
  direction,
  className,
  onClick,
  disabled,
}: {
  direction: "left" | "right";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      className={`border border-gray-700 dark:border-neutral-700 rounded-full p-1.5 disabled:opacity-30 ${
        className || ""
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {direction === "left" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5 8.25 12l7.5-7.5"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m8.25 4.5 7.5 7.5-7.5 7.5"
          />
        </svg>
      )}
    </button>
  );
}

interface DateMappedPuzzles {
  [date: string]: ArchiveResponseRow;
}

const AVAILABLE_MONTHS = [4, 5, 6, 7, 8, 11];
const AVAILABLE_YEARS = [2024];

export default function Archive() {
  const [monthIndex, setMonthIndex] = useState(AVAILABLE_MONTHS.length - 1);
  const [yearIndex, setYearIndex] = useState(AVAILABLE_YEARS.length - 1);

  const [dateMappedPuzzles, setDateMappedPuzzles] = useState<DateMappedPuzzles>(
    {}
  );

  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const updateDateMappedPuzzles = async () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      const controller = new AbortController();
      abortControllerRef.current = controller;

      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      try {
        const archiveResponse = await fetchArchive(
          {
            month: AVAILABLE_MONTHS[monthIndex],
            year: AVAILABLE_YEARS[yearIndex],
            timeZone: timeZone,
          },
          controller.signal
        );
        if (archiveResponse === null) {
          return;
        }

        const dateMap: DateMappedPuzzles = {};
        for (const row of archiveResponse) {
          dateMap[row.date] = row;
        }
        console.log(dateMap);
        setDateMappedPuzzles(dateMap);
      } catch (error) {}
    };

    updateDateMappedPuzzles();
  }, [monthIndex, yearIndex]);

  const canIncrement =
    monthIndex < AVAILABLE_MONTHS.length - 1 ||
    yearIndex < AVAILABLE_YEARS.length - 1;
  const canDecrement = monthIndex > 0 || yearIndex > 0;

  const increment = () => {
    if (!canIncrement) {
      return;
    }
    if (monthIndex < AVAILABLE_MONTHS.length - 1) {
      setMonthIndex((prevIndex) => prevIndex + 1);
    } else {
      setYearIndex((prevIndex) => prevIndex + 1);
      setMonthIndex(0);
    }
    setDateMappedPuzzles({});
  };

  const decrement = () => {
    if (!canDecrement) {
      return;
    }
    if (monthIndex > 0) {
      setMonthIndex((prevIndex) => prevIndex - 1);
    } else {
      setYearIndex((prevIndex) => prevIndex - 1);
      setMonthIndex(AVAILABLE_MONTHS.length - 1);
    }
    setDateMappedPuzzles({});
  };

  const getDateTile = (date: Date) => {
    const dateStr = formatDateYYYYMMDD(date);
    const puzzle = dateMappedPuzzles[dateStr];

    // Default color classes for the date tile
    let colorClasses =
      "bg-gray-100 border-gray-400 dark:bg-neutral-700 dark:border-neutral-500";
    let url: string | undefined;

    // Check if there is a puzzle for the given date
    if (puzzle) {
      // Load the game state for the puzzle
      const storedGameState = loadLocalGameState(puzzle.id);

      // Update color classes based on the game state
      if (storedGameState) {
        if (storedGameState.solved) {
          colorClasses =
            "bg-green-200 border-green-500 dark:bg-green-800 dark:border-green-500";
        } else if (storedGameState.gameOver) {
          colorClasses =
            "bg-red-200 border-red-400 dark:bg-red-900 dark:border-red-500";
        } else if (storedGameState.currentGuess > 1) {
          colorClasses =
            "bg-yellow-100 border-yellow-500 dark:bg-yellow-800 dark:border-yellow-500";
        }
      }
      // Set the URL to the puzzle page
      url = `/puzzle/${puzzle.id}`;
    } else if (Object.keys(dateMappedPuzzles).length > 0) {
      // If there are no puzzles for the date but there are puzzles in the map, set blank color classes
      colorClasses = "border-gray-200 dark:border-neutral-800";
    } else {
      // If there are no puzzles for the date and there are no puzzles in the map, set loading classes
      colorClasses = "border-none bg-gray-100 dark:bg-neutral-800";
    }

    // If user selects current date, redirect to home.
    if (date.toDateString() === new Date().toDateString()) {
      url = "/";
    }

    return (
      <div className="px-1.5 py-1.5 w-full flex flex-col items-center">
        <Link
          href={url || ""}
          className={`aspect-square border w-full max-w-12 ${colorClasses} rounded flex items-center justify-center`}
        ></Link>
        <p className="text-center text-sm sm:text-base mt-0.5 leading-normal">
          {date.getDate()}
        </p>
      </div>
    );
  };

  return (
    <HeaderTemplate>
      <div
        className={`text-center text-2xl ${robotoSlab.className} tracking-tight leading-normal font-normal my-4`}
      >
        Archive
      </div>
      <div className="flex justify-center items-center gap-3 my-4">
        <NavButton
          direction="left"
          onClick={decrement}
          disabled={!canDecrement}
        />
        <Select
          value={monthIndex}
          onChange={(e) => {
            setMonthIndex(Number(e.target.value));
            setDateMappedPuzzles({});
          }}
        >
          {AVAILABLE_MONTHS.map((month, index) => (
            <option value={index} key={index}>
              {getMonthString(month)}
            </option>
          ))}
        </Select>
        <Select
          value={yearIndex}
          onChange={(e) => {
            setYearIndex(Number(e.target.value));
            setDateMappedPuzzles({});
          }}
        >
          {AVAILABLE_YEARS.map((year, index) => (
            <option value={index} key={index}>
              {year}
            </option>
          ))}
        </Select>
        <NavButton
          direction="right"
          onClick={increment}
          disabled={!canIncrement}
        />
      </div>
      <div className="w-full flex justify-center">
        <div className="w-full p-1.5 max-w-lg">
          <PuzzleCalendar
            getDateTile={getDateTile}
            year={AVAILABLE_YEARS[yearIndex]}
            month={AVAILABLE_MONTHS[monthIndex]}
          />
        </div>
      </div>
    </HeaderTemplate>
  );
}
