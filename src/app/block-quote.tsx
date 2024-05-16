import { Roboto_Mono } from "next/font/google";

const robotoMono = Roboto_Mono({ subsets: ["latin"] });

interface BlockQuoteProps {
  children?: React.ReactNode;
}

export default function BlockQuote({ children }: BlockQuoteProps) {
  return (
    <div className="border-slate-300 dark:border-zinc-600 rounded p-2.5 bg-gray-200 dark:bg-zinc-800 my-4">
      <p
        className={`font-extrabold text-lg text-center text-slate-600 dark:text-zinc-200 ${robotoMono.className}`}
      >
        {children}
      </p>
    </div>
  );
}
