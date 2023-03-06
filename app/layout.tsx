import { inter } from "@/lib/font";
import { Metadata } from "next";
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
      <body>{children}</body>
      <Analytics />
    </html>
  );
}
