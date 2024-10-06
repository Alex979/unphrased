import Link from "next/link";
import HeaderTemplate from "./header-template";
import { Roboto_Slab } from "next/font/google";

const robotoSlab = Roboto_Slab({ subsets: ["latin"] });

export default function PuzzleNotFound() {
  return (
    <HeaderTemplate>
      <div className="text-center pt-40 px-12">
        <h1 className={`text-2xl font-extrabold ${robotoSlab.className} mb-4`}>
          No puzzle right now!
        </h1>
        <p className="text-xl mb-8">I forgor 💀</p>
        <p className="leading-relaxed">
          Please check again later, or visit the{" "}
          <Link
            href="/archive"
            className="underline text-indigo-500 hover:text-indigo-400 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            archive
          </Link>{" "}
          to play previous puzzles.
        </p>
      </div>
    </HeaderTemplate>
  );
}
