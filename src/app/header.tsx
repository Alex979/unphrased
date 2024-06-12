import { Roboto_Slab } from "next/font/google";

const robotoSlab = Roboto_Slab({ subsets: ["latin"] });

interface HeaderProps {
  onOpenHelp: () => void;
}

export default function Header({ onOpenHelp }: HeaderProps) {
  return (
    <header className="w-full py-2 px-6 tiny:py-1 tiny:px-4 border-b dark:border-neutral-600 flex justify-between items-center">
      <h1
        className={`text-3xl tiny:text-2xl font-black tracking-tight underline ${robotoSlab.className}`}
      >
        Unphrased
      </h1>
      <button onClick={() => onOpenHelp()}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-7 h-7"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
          />
        </svg>
      </button>
    </header>
  );
}
