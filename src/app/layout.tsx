import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Unphrased",
  description: "Reveal the hidden phrase in 8 guesses. New phrase each day.",
  openGraph: {
    title: "Unphrased - A daily phrase guessing game",
    images: "https://www.unphrased.app/unphrased_og.png",
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
        className={`dark:bg-zinc-900 dark:text-zinc-100 ${inter.className}`}
      >
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
