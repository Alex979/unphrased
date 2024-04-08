import { Inconsolata } from "next/font/google";

const inconsolata = Inconsolata({ subsets: ["latin"] });

interface BlockQuoteProps {
  children?: React.ReactNode;
}

export default function BlockQuote({ children }: BlockQuoteProps) {
  return (
    <div className="border border-slate-300 dark:border-zinc-600 rounded p-2 bg-slate-200 dark:bg-zinc-800 my-4">
      <p
        className={`font-extrabold text-xl text-slate-600 dark:text-zinc-200 ${inconsolata.className}`}
      >
        {children}
      </p>
    </div>
  );
}
