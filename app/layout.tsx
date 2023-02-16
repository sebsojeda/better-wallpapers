import { inter } from "@/lib/font";
import Header from "./components/Header";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <head />
      <body className="bg-white">
        <Header />
        <div className="pt-48">{children}</div>
      </body>
    </html>
  );
}
