import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics } from "@next/third-parties/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Unphrased - Daily phrase guessing game",
  description: "Reveal the hidden phrase in 8 guesses. A new phrase every day.",
  openGraph: {
    title: "Unphrased - A daily phrase guessing game",
    images: "https://www.unphrased.app/unphrased_og.png",
    siteName: "Unphrased",
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
        className={`dark:bg-neutral-900 dark:text-neutral-100 ${inter.className}`}
      >
        {children}
        <Analytics />
        <SpeedInsights />
        <GoogleAnalytics gaId="G-46BQPX3K39" />
      </body>
    </html>
  );
}
