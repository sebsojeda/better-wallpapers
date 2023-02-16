import { pacifico } from "@/lib/font";
import Image from "next/image";

export default function Header() {
  return (
    <header className="p-4 bg-white border-b-neutral-200 border fixed w-full z-10 flex justify-between">
      <div className={`${pacifico.className} text-red-500 text-3xl`}>
        Better Wallpapers
      </div>
      <div>
        <Image
          src="assets/download-on-the-mac-app-store-badge.svg"
          width={156}
          height={40}
          alt="Download on the Mac App Store"
        />
      </div>
    </header>
  );
}
