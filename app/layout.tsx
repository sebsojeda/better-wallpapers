import { inter } from "@/lib/font";
import { Metadata } from "next";
import Link from "next/link";
import Analytics from "./Analytics";
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
    <html lang="en" className={inter.className}>
      <body>
        <div className="px-4 sm:px-8 lg:px-12 py-6 border-b border-b-neutral-200 mx-auto max-w-5xl mb-16">
          <Link
            href="/"
            className="mr-5 border border-neutral-300 px-1 rounded-lg bg-gradient-to-r from-violet-600 via-fuchsia-500 to-amber-500 bg-clip-text text-transparent font-bold text-2xl sm:text-3xl"
          >
            W
          </Link>
          <span className="font-bold text-2xl sm:text-3xl">
            Better Wallpapers 2
          </span>
          <span className="ml-3 text-neutral-500 font-light text-xl hidden sm:inline">
            High-Resolution Images
          </span>
        </div>
        {children}
      </body>
      <Analytics />
    </html>
  );
}
