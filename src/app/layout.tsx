import type { Metadata } from "next";
import { Noto_Sans_JP, REM } from "next/font/google";
import { NoiseFilter } from "@/components/NoiseFilter";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-noto-sans-jp",
  display: "swap",
});

const rem = REM({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-rem",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MoreHarvest - Kumamoto investment pitch",
  description: "A full-viewport investment pitch experience for MoreHarvest.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${notoSansJP.variable} ${rem.variable} antialiased`}>
        <NoiseFilter />
        {children}
      </body>
    </html>
  );
}
