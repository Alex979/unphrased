import { Roboto_Slab } from "next/font/google";
import SmallChip from "./_components/small-chip";

const robotoSlab = Roboto_Slab({ subsets: ["latin"] });

interface HeaderProps {
  onOpenHelp?: () => void;
  onOpenMenu: () => void;
  chipText?: string;
}

export default function Header({
  onOpenHelp,
  onOpenMenu,
  chipText,
}: HeaderProps) {
  return (
    <header className="w-full py-1 md:py-5 px-4 md:px-6 border-b border-gray-300 dark:border-neutral-600 flex justify-between items-center">
      <div className="flex items-center">
        <button onClick={() => onOpenMenu()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-7 mr-4 md:mr-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
        <h1
          className={`mr-2 md:mr-4 text-2xl md:text-4xl font-black tracking-tight underline ${robotoSlab.className} leading-normal`}
        >
          Unphrased
        </h1>
        {chipText && (
          <div className="flex flex-col mt-1.5 md:mt-3">
            <SmallChip responsive>{chipText}</SmallChip>
          </div>
        )}
      </div>
      {onOpenHelp && (
        <button onClick={() => onOpenHelp()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-7"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
            />
          </svg>
        </button>
      )}
    </header>
  );
}
