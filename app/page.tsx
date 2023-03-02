import prisma from "@/lib/prisma";
import { randomInt } from "crypto";
import Image from "next/image";
import abstract from "public/assets/abstract.jpg";
import animals from "public/assets/animals.jpg";
import art from "public/assets/art.jpg";
import athletics from "public/assets/athletics.jpg";
import devicesImage from "public/assets/devices-wallpapers.png";
import appBadge from "public/assets/download-on-the-mac-app-store-badge.svg";
import editorial from "public/assets/editorial.jpg";
import nature from "public/assets/nature.jpg";
import patterns from "public/assets/patterns.jpg";
import quotes from "public/assets/quotes.jpg";
import space from "public/assets/space.jpg";
import Hero from "./components/Hero";
import WallpaperRoll from "./components/WallpaperRoll";

async function getRandomWallpapers() {
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
    const skip = randomInt(0, count - 4);
    const tagsOnImages = await prisma.tagsOnImages.findMany({
      skip,
      take: 5,
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
      return tagsOnImages.map((t) => t.image.externalId);
    } else {
      return [];
    }
  } else {
    return [];
  }
}

export default async function Home() {
  const randomImages = await getRandomWallpapers();

  return (
    <>
      <Hero />

      <WallpaperRoll images={randomImages} />

      <div className="relative mx-auto max-w-3xl mt-16 px-4 sm:px-8 lg:px-12 py-6">
        <h2 className="font-bold text-4xl sm:text-5xl">
          Never grow tired of your wallpaper.
        </h2>
        <p className="text-neutral-600 mt-10 text-base">
          Refresh your wallpaper as often as you&apos;d like. Update one screen,
          or all of them. Prefer certain categories? We got you covered.
        </p>
        <div className="mt-10 overflow-hidden flex justify-start">
          <div className="flex-none relative w-[450px] rounded-lg overflow-hidden h-[400px] bg-white">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white z-10"></div>
            <div className="border border-neutral-200 p-4">
              <div className="font-bold">Better Wallpapers</div>
              <div>
                <div></div>
                <div></div>
              </div>
              <div className="flex flex-col gap-4 mt-4">
                <label>
                  <input type="checkbox" checked={false} readOnly />
                  <span className="ml-1">Launch at login</span>
                </label>
                <label>
                  <input type="checkbox" checked readOnly className="" />
                  <span className="ml-1">Update on all screens</span>
                </label>
                <label>
                  Schedule
                  <select>
                    <option>Hourly</option>
                    <option>Daily</option>
                    <option>Weekly</option>
                  </select>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={editorial}
                      className="object-cover w-full h-full"
                      alt="Editorial"
                    />
                    <input
                      type="checkbox"
                      checked
                      readOnly
                      className="absolute top-4 right-4"
                    />
                    <span className="text-white text-xs absolute top-4 left-4">
                      Editorial
                    </span>
                  </div>
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={nature}
                      className="object-cover w-full h-full"
                      alt="Nature"
                    />
                    <input
                      type="checkbox"
                      checked
                      readOnly
                      className="absolute top-4 right-4"
                    />
                    <span className="text-white text-xs absolute top-4 left-4">
                      Nature
                    </span>
                  </div>
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={space}
                      className="object-cover w-full h-full"
                      alt="Space"
                    />
                    <input
                      type="checkbox"
                      checked
                      readOnly
                      className="absolute top-4 right-4"
                    />
                    <span className="text-white text-xs absolute top-4 left-4">
                      Space
                    </span>
                  </div>
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={abstract}
                      className="object-cover w-full h-full"
                      alt="Abstract"
                    />
                    <input
                      type="checkbox"
                      checked
                      readOnly
                      className="absolute top-4 right-4"
                    />
                    <span className="text-white text-xs absolute top-4 left-4">
                      Abstract
                    </span>
                  </div>
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={patterns}
                      className="object-cover w-full h-full"
                      alt="Patterns"
                    />
                    <input
                      type="checkbox"
                      checked
                      readOnly
                      className="absolute top-4 right-4"
                    />
                    <span className="text-white text-xs absolute top-4 left-4">
                      Patterns
                    </span>
                  </div>
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={athletics}
                      className="object-cover w-full h-full"
                      alt="Athletics"
                    />
                    <input
                      type="checkbox"
                      checked
                      readOnly
                      className="absolute top-4 right-4"
                    />
                    <span className="text-white text-xs absolute top-4 left-4">
                      Athletics
                    </span>
                  </div>
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={quotes}
                      className="object-cover w-full h-full"
                      alt="Quotes"
                    />
                    <input
                      type="checkbox"
                      checked
                      readOnly
                      className="absolute top-4 right-4"
                    />
                  </div>
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={animals}
                      className="object-cover w-full h-full"
                      alt="Animals"
                    />
                    <input
                      type="checkbox"
                      checked
                      readOnly
                      className="absolute top-4 right-4"
                    />
                  </div>
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={art}
                      className="object-cover w-full h-full"
                      alt="Art"
                    />
                    <input
                      type="checkbox"
                      checked
                      readOnly
                      className="absolute top-4 right-4"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto mt-16 px-4 sm:px-8 lg:px-12">
        <h2 className="font-bold text-4xl sm:text-5xl">
          Every screen deserves a stunning wallpaper.
        </h2>
        <p className="text-neutral-600 mt-10 text-base">
          High-quality and visually appealing images for every screen. 4k
          display? No problem. You&apos;re going to love your next wallpaper.
        </p>
      </div>
      <div className="relative max-w-3xl mx-auto mt-16 overflow-hidden px-4 sm:px-8 lg:px-12">
        <Image
          src={devicesImage}
          alt="Monitor with a wallpaper of 3 brightly colored buildings."
        />
      </div>

      <div className="flex-wrap gap-4 rounded-lg bg-gradient-to-br from-zinc-100 to-zinc-50 max-w-3xl mx-auto px-4 sm:px-8 lg:px-12 py-6 mt-16 flex justify-between">
        <div className="font-bold text-2xl whitespace-nowrap">
          Better Wallpapers
        </div>
        <div className="">
          <Image src={appBadge} alt="Download on the Mac App Store" />
        </div>
      </div>

      <footer className="max-w-3xl mx-auto border-t border-t-neutral-200 mt-16">
        <div className="px-4 sm:px-8 lg:px-12 py-6">
          <span className="text-neutral-500 text-xs">
            Copyright &copy; {new Date().getFullYear()} Better Wallpapers. All
            Rights Reserved.
          </span>
        </div>
      </footer>
    </>
  );
}
