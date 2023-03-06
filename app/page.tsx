import Image from "next/image";
import animals from "public/assets/animals.jpg";
import architecture from "public/assets/architecture.jpg";
import art from "public/assets/art.jpg";
import badge from "public/assets/download-on-the-mac-app-store-badge.svg";
import nature from "public/assets/nature.jpg";
import settings from "public/assets/settings.png";
import space from "public/assets/space.jpg";
import wallpaper from "public/assets/wallpaper.png";
import Hero from "./Hero";

export default async function Home() {
  return (
    <>
      <Hero />

      <div className="flex gap-5 lg:gap-8 overflow-hidden justify-center my-16">
        <div className="relative w-60 aspect-[4/3] flex-none rounded-lg overflow-hidden">
          <Image
            src={space}
            alt="Night time shot of mountains with stars above."
            className="object-cover object-bottom w-full h-full"
          />
        </div>
        <div className="relative w-60 aspect-[4/3] flex-none rounded-lg overflow-hidden">
          <Image
            src={architecture}
            alt="Large white building on the corner of a street."
            className="object-cover object-top w-full h-full"
          />
        </div>
        <div className="relative w-60 aspect-[4/3] flex-none rounded-lg overflow-hidden">
          <Image
            src={art}
            alt="Abstract blue and green wave on a white background."
            className="object-cover w-full h-full"
          />
        </div>
        <div className="relative w-60 aspect-[4/3] flex-none rounded-lg overflow-hidden">
          <Image
            src={nature}
            alt="Close-up of a bright green plant at night."
            className="object-cover w-full h-full"
          />
        </div>
        <div className="relative w-60 aspect-[4/3] flex-none rounded-lg overflow-hidden">
          <Image
            src={animals}
            alt="A standing fox staring directly at the camera."
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      <div className="bg-neutral-100 py-16">
        <div className="flex flex-col lg:flex-row gap-8 max-w-5xl mx-auto px-4 sm:px-8 lg:px-12">
          <div className="flex flex-col justify-center">
            <h2 className="font-bold text-3xl sm:text-4xl">
              Never grow tired of your wallpaper.
            </h2>
            <p className="text-neutral-600 mt-6 text-base">
              Refresh your wallpaper as often as you&apos;d like and download
              your favorite ones to use anywhere. Find a wallpaper you love?
              Discover the photographer&apos;s portfolio in just one click.
            </p>
          </div>
          <div className="mt-10 lg:mt-0 rounded-lg overflow-hidden flex-none lg:w-1/2">
            <Image
              src={wallpaper}
              alt="Screenshot of the Better Wallpapers app."
            />
          </div>
        </div>
      </div>

      <div className="py-16">
        <div className="flex flex-col-reverse lg:flex-row gap-8 max-w-5xl mx-auto px-4 sm:px-8 lg:px-12">
          <div className="rounded-lg overflow-hidden flex-none lg:w-1/2">
            <Image
              src={settings}
              alt="Screenshot of the Better Wallpapers app settings."
            />
          </div>
          <div className="flex flex-col justify-center max-w-2xl mt-10 lg:mt-0">
            <h2 className="font-bold text-3xl sm:text-4xl">
              Your personal touch, your unique style.
            </h2>
            <p className="text-neutral-600 mt-6 text-base">
              Schedule your wallpaper to update hourly, daily, or weekly. Update
              one screen, or all of them. Choose from a curated collection of
              categories to find the perfect wallpaper for your mood.
            </p>
          </div>
        </div>
      </div>

      <footer className="max-w-5xl mx-auto border-t border-t-neutral-200 mt-16">
        <div className="px-4 sm:px-8 lg:px-12 pt-6 pb-16 flex flex-col-reverse justify-between items-center sm:flex-row">
          <span className="text-neutral-500 text-sm mt-6 sm:mt-0">
            Copyright &copy; {new Date().getFullYear()} Better Wallpapers.
          </span>
          <span>
            <Image src={badge} alt="Download on the Mac App Store" />
          </span>
        </div>
      </footer>
    </>
  );
}
