"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import appBadge from "public/assets/download-on-the-mac-app-store-badge.svg";

export default function Hero() {
  return (
    <motion.header initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
      <div className="px-4 sm:px-8 lg:px-12 py-6 border-b border-b-neutral-200 mx-auto max-w-3xl font-bold text-2xl sm:text-3xl">
        Better Wallpapers
      </div>
      <div className="mx-auto max-w-3xl mt-12">
        <div className="px-4 sm:px-8 lg:px-12">
          <h1 className="font-bold text-4xl sm:text-5xl">
            Beautiful, high-resolution desktop wallpapers for{" "}
            <span className="text-blue-500">MacOS</span>.
          </h1>
          <div className="mt-6 text-base text-neutral-600">
            Endless curated images featuring categories such as nature,
            patterns, quotes, animals, and more.
          </div>
          <div className="mt-6">
            <Image src={appBadge} alt="Download on the Mac App Store" />
          </div>
        </div>
      </div>
    </motion.header>
  );
}
