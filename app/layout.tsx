import { Inter } from "@next/font/google";
import Header from "./components/Header";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <head />
      <body className="text-black p-4">
        <Header />
        <div>{children}</div>
      </body>
    </html>
  );
}
