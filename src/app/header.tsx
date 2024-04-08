import { Roboto_Slab } from "next/font/google";

const robotoSlab = Roboto_Slab({ subsets: ["latin"] });

export default function Header() {
  return (
    <header className="w-full py-2 px-6 border-b dark:border-zinc-600">
      <h1 className={`text-3xl font-black tracking-tight underline ${robotoSlab.className}`}>Unphrased</h1>
    </header>
  );
}
