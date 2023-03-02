"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import appBadge from "public/assets/download-on-the-mac-app-store-badge.svg";

export default function Hero() {
  return (
    <motion.header initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
      <div className="px-4 sm:px-8 lg:px-12 py-6 border-b border-b-neutral-200 mx-auto max-w-3xl flex justify-between items-end">
        <div className="font-bold text-2xl sm:text-3xl">Better Wallpapers</div>
        <a
          href="https://github.com/sebsojeda/better-wallpapers"
          className="text-sm text-neutral-500 flex items-end gap-1 hover:text-blue-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
            />
          </svg>
          Edit in GitHub
        </a>
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
