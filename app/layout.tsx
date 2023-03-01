import { inter } from "@/lib/font";
import { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Better Wallpapers",
  description:
    "Beautiful high-resolution desktop wallpaper app for MacOS. Endless curated images featuring categories such as nature, pattens, quotes, animals, and more.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  );
}
