import Image from "next/image";
import Link from "next/link";
import animals from "public/assets/animals.jpg";
import architecture from "public/assets/architecture.jpg";
import art from "public/assets/art.jpg";
import badge from "public/assets/download-on-the-mac-app-store-badge.svg";
import favorites from "public/assets/favorites.png";
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
              Discover the artist&apos;s portfolio in just one click.
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
        <div className="flex flex-col lg:flex-row-reverse gap-8 max-w-5xl mx-auto px-4 sm:px-8 lg:px-12">
          <div className="flex flex-col justify-center">
            <h2 className="font-bold text-3xl sm:text-4xl">
              Revisit your favorites.
            </h2>
            <p className="text-neutral-600 mt-6 text-base">
              Grow your own collection by saving your favorite wallpapers to
              your favorites list. Endless inspiration at your fingertips.
            </p>
          </div>
          <div className="mt-10 lg:mt-0 rounded-lg overflow-hidden flex-none lg:w-1/2">
            <Image
              src={favorites}
              alt="Screenshot of the Better Wallpapers app."
            />
          </div>
        </div>
      </div>

      <div className="bg-neutral-100 py-16">
        <div className="flex flex-col lg:flex-row gap-8 max-w-5xl mx-auto px-4 sm:px-8 lg:px-12">
          <div className="flex flex-col justify-center">
            <h2 className="font-bold text-3xl sm:text-4xl">
              Your personal touch, your unique style.
            </h2>
            <p className="text-neutral-600 mt-6 text-base">
              Schedule your wallpaper to update daily or weekly. Update one
              screen, or all of them. Choose from a curated collection of
              categories to find the perfect wallpaper for your mood.
            </p>
          </div>
          <div className="mt-10 lg:mt-0 rounded-lg overflow-hidden flex-none lg:w-1/2">
            <Image
              src={settings}
              alt="Screenshot of the Better Wallpapers app settings."
            />
          </div>
        </div>
      </div>

      <div className="mt-16" id="support">
        <div className="flex flex-col items-center py-16 gap-6 max-w-5xl mx-auto px-4 sm:px-8 lg:px-12 border-t border-t-neutral-200">
          <div className="font-bold text-3xl sm:text-4xl">Support</div>
          <div className="text-neutral-500 text-center">
            For support, please email us at{" "}
            <a
              href="mailto:hello@betterwallpapers.app?subject=Request for support"
              className="text-blue-500 underline"
            >
              hello@betterwallpapers.app
            </a>
          </div>
        </div>
      </div>

      <footer className="max-w-5xl mx-auto border-t border-t-neutral-200">
        <div className="px-4 sm:px-8 lg:px-12 py-16 flex flex-col-reverse justify-between items-center sm:flex-row gap-6">
          <span className="text-neutral-500 text-sm">
            Copyright &copy; {new Date().getFullYear()} Better Wallpapers.
          </span>
          <Link href="/privacy" className="text-neutral-500 text-sm">
            Privacy Policy
          </Link>
          <span>
            <Image src={badge} alt="Download on the Mac App Store" />
          </span>
        </div>
      </footer>
    </>
  );
}
