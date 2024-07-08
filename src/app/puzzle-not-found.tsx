import HeaderTemplate from "./header-template";
import { Roboto_Slab } from "next/font/google";

const robotoSlab = Roboto_Slab({ subsets: ["latin"] });

export default function PuzzleNotFound() {
  return (
    <HeaderTemplate>
      <div className="text-center pt-40">
        <h1 className={`text-2xl font-extrabold ${robotoSlab.className} mb-4`}>
          No puzzle right now!
        </h1>
        <p className="text-xl mb-8">I forgor 💀</p>
        <p>Please check again later.</p>
      </div>
    </HeaderTemplate>
  );
}
