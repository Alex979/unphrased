"use client";

import { useState } from "react";
import Select from "../_components/select";
import HeaderTemplate from "../header-template";
import { Roboto_Slab } from "next/font/google";

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
      console.log(colStart);
    }
    dateGrid.push(
      <div className={`${colStart}`} key={i}>
        {getDateTile(new Date(year, month - 1, i + 1))}
      </div>
    );
  }

  return <div className="grid grid-cols-7">{dateGrid}</div>;
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
      className={`border border-gray-700 rounded-full p-1.5 disabled:opacity-30 ${className || ""}`}
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

export default function Archive() {
  const availableMonths = [4, 5, 6];
  const availableYears = [2024];

  const [monthIndex, setMonthIndex] = useState(availableMonths.length - 1);
  const [yearIndex, setYearIndex] = useState(availableYears.length - 1);

  const canIncrement =
    monthIndex < availableMonths.length - 1 ||
    yearIndex < availableYears.length - 1;
  const canDecrement =
    monthIndex > 0 || yearIndex > 0;

  const increment = () => {
    if (!canIncrement) {
      return;
    }
    if (monthIndex < availableMonths.length - 1) {
      setMonthIndex(prevIndex => prevIndex + 1);
    } else {
      setYearIndex(prevIndex => prevIndex + 1);
      setMonthIndex(0);
    }
  };

  const decrement = () => {
    if (!canDecrement) {
      return;
    }
    if (monthIndex > 0) {
      setMonthIndex(prevIndex => prevIndex - 1);
    } else {
      setYearIndex(prevIndex => prevIndex - 1);
      setMonthIndex(availableMonths.length - 1);
    }
  };

  const getDateTile = (date: Date) => {
    return (
      <div className="px-1.5 pb-1.5">
        <div className="aspect-square bg-gray-100 border border-gray-400 rounded flex items-center justify-center"></div>
        <p className="text-center text-sm mt-0.5 font leading-normal">
          {date.getDate()}
        </p>
      </div>
    );
  };

  return (
    <HeaderTemplate>
      <div
        className={`text-center text-2xl ${robotoSlab.className} tracking-tight leading-normal font-light my-4`}
      >
        Archive
      </div>
      <div className="flex justify-center items-center gap-3 my-4">
        <NavButton direction="left" onClick={decrement} disabled={!canDecrement} />
        <Select
          value={monthIndex}
          onChange={(e) => setMonthIndex(Number(e.target.value))}
        >
          {availableMonths.map((month, index) => (
            <option value={index} key={index}>
              {getMonthString(month)}
            </option>
          ))}
        </Select>
        <Select
          value={yearIndex}
          onChange={(e) => setYearIndex(Number(e.target.value))}
        >
          {availableYears.map((year, index) => (
            <option value={index} key={index}>
              {year}
            </option>
          ))}
        </Select>
        <NavButton direction="right" onClick={increment} disabled={!canIncrement} />
      </div>
      <div className="p-1.5">
        <PuzzleCalendar
          getDateTile={getDateTile}
          year={availableYears[yearIndex]}
          month={availableMonths[monthIndex]}
        />
      </div>
    </HeaderTemplate>
  );
}
