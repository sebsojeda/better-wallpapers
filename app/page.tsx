import Image from "next/image";
import FadeIn from "./components/FadeIn";
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
    <main>
      <div className="relative max-w-4xl mx-auto">
        <FadeIn>
          {!!randomImage && (
            <Image
              src={`https://res.cloudinary.com/better-wallpapers/image/upload/c_fill,h_400,q_100,w_600/${randomImage.externalVersion}/${randomImage.externalId}.jpg`}
              width={600}
              height={400}
              className="rounded"
              alt="Random wallpaper image."
            />
          )}
        </FadeIn>
        <HeroText />
      </div>
    </main>
  );
}
