"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import appBadge from "public/assets/download-on-the-mac-app-store-badge.svg";

export default function Hero() {
  return (
    <motion.header initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
      <div className="mx-auto max-w-5xl">
        <div className="px-4 sm:px-8 lg:px-12">
          <h1 className="font-bold text-4xl sm:text-5xl">
            Beautiful, high-resolution wallpapers for{" "}
            <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-amber-500 bg-clip-text text-transparent">
              MacOS.
            </span>
          </h1>
          <div className="mt-6 text-base text-neutral-600">
            Transform your desktop into a stunning masterpiece. From nature and
            abstract designs to animal and pattern wallpapers, you can customize
            your desktop with the perfect wallpaper that reflects your
            personality and style.
          </div>
          <div className="mt-6">
            <Image src={appBadge} alt="Download on the Mac App Store" />
          </div>
        </div>
      </div>
    </motion.header>
  );
}
