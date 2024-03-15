import { inter } from "@/lib/font";
import { Analytics } from "@vercel/analytics/react";
import { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Better Wallpapers 2",
  description:
    "Transform your desktop into a stunning masterpiece. From nature and abstract designs to animal and pattern wallpapers, you can customize your MacOS desktop with the perfect wallpaper that reflects your personality and style.",
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="max-w-5xl px-4 py-6 mx-auto mb-16 border-b sm:px-8 lg:px-12 border-b-neutral-200">
          <Link
            href="/"
            className="px-1 mr-5 text-2xl font-bold text-transparent border rounded-lg border-neutral-300 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-amber-500 bg-clip-text sm:text-3xl"
          >
            W
          </Link>
          <span className="text-2xl font-bold sm:text-3xl">
            Better Wallpapers 2
          </span>
          <span className="hidden ml-3 text-xl font-light text-neutral-500 sm:inline">
            High-Resolution Images
          </span>
        </div>
        {children}
      </body>
      <Analytics />
    </html>
  );
}
