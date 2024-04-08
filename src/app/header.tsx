import { Roboto_Slab } from "next/font/google";

const robotoSlab = Roboto_Slab({ subsets: ["latin"] });

export default function Header() {
  return (
    <header className="w-full p-4 border-b">
      <h1 className={`text-3xl font-black text-center ${robotoSlab.className}`}>Unphrased</h1>
    </header>
  );
}
