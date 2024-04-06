import Image from "next/image";
import VirtualKeyboard from "./keyboard";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <div className="flex-1"></div>
      <VirtualKeyboard />
    </main>
  );
}
