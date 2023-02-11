import { Pacifico } from "@next/font/google";

const pacifico = Pacifico({ weight: "400", subsets: ["latin"] });

export default function Header() {
  return (
    <header>
      <div
        className={`${pacifico.className} text-red-500 text-4xl pb-28 max-w-4xl mx-auto mt-4`}
      >
        Better Wallpapers
      </div>
    </header>
  );
}
