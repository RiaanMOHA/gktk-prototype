import type { Metadata } from "next";
import "./globals.css";

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
      <body className="antialiased">{children}</body>
    </html>
  );
}
