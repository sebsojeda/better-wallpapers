import { pacifico } from "@/lib/font";
import prisma from "@/lib/prisma";
import { randomInt } from "crypto";
import Image from "next/image";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HeroCard from "./components/HeroCard";
import HeroImage from "./components/HeroImage";

async function getRandomWallpaper() {
  const count = await prisma.tagsOnImages.count({
    where: {
      image: {
        visible: true,
      },
      tag: {
        name: "editorial",
      },
    },
  });
  if (count > 0) {
    const skip = randomInt(0, count);
    const tagsOnImages = await prisma.tagsOnImages.findFirst({
      skip,
      include: {
        image: true,
      },
      where: {
        image: {
          visible: true,
        },
        tag: {
          name: "editorial",
        },
      },
    });
    if (tagsOnImages) {
      return {
        externalId: tagsOnImages.image.externalId,
      };
    } else {
      return {
        externalId: "m6txptqgimg8i4cnjaa5",
      };
    }
  } else {
    return {
      externalId: "m6txptqgimg8i4cnjaa5",
    };
  }
}

export default async function Home() {
  const randomImage = await getRandomWallpaper();

  return (
    <>
      <Header />
      <main className="pt-48">
        <div className="relative max-w-5xl mx-auto px-4">
          <HeroImage imageId={randomImage.externalId} />
          <HeroCard />
          <div className="mt-44 max-w-xl">
            <h3 className="text-3xl font-bold">
              Every screen deserves a stunning wallpaper
            </h3>
            <p className="text-neutral-500 mt-1">
              High-quality and visually appealing images for every screen. 4k
              display? No problem. You&apos;ll love your next wallpaper.
            </p>
          </div>
          <div className="mt-44 bg-gradient-to-r from-yellow-100 to-red-100 p-4 rounded h-60 flex justify-between items-end">
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
      </main>
      <Footer />
    </>
  );
}
