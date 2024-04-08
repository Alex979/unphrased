import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Unphrased",
  description: "Guess today's hidden phrase!",
  openGraph: {
    title: "Unphrased - A daily phrase guessing game",
    images: "unphrased_og.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`dark dark:bg-zinc-900 dark:text-zinc-100 ${inter.className}`}
      >
        {children}
      </body>
    </html>
  );
}
