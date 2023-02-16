import { pacifico } from "@/lib/font";
import Image from "next/image";
import FadeIn from "./components/FadeIn";
import Footer from "./components/Footer";
import HeaderText from "./components/HeaderText";
import HeroText from "./components/HeroText";

async function getRandomWallpaper() {
  const res = await fetch(
    `https://www.betterwallpapers.app/api/random?tag=editorial`
  );
  const data = await res.json();
  return data;
}

export default async function Home() {
  const randomImage = await getRandomWallpaper();

  return (
    <>
      <main>
        <div className="relative max-w-5xl mx-auto px-4">
          <FadeIn>
            {!!randomImage && (
              <Image
                src={`https://res.cloudinary.com/better-wallpapers/image/upload/c_fill,h_400,q_100,w_600/${randomImage.externalId}.jpg`}
                width={600}
                height={400}
                className="rounded"
                alt="Random wallpaper image."
              />
            )}
          </FadeIn>
          <HeroText />
          <div className="mt-44">
            <h3 className="text-3xl font-bold">
              Every screen deserves a stunning wallpaper
            </h3>
            <p className="text-neutral-500">
              High-quality and visually appealing images for every screen. 4k
              display? No problem. You&apos;ll love your next wallpaper.
            </p>
          </div>
          <div className="bg-gradient-to-r from-yellow-100 to-red-100 p-4 rounded max-w-4xl ml-auto h-60">
            <div className={`${pacifico.className} text-lg`}>
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
          </div>
        </div>
        <HeaderText />
      </main>
      <Footer />
    </>
  );
}
