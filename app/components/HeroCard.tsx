"use client";

import { motion } from "framer-motion";

export default function HeroCard() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1, top: "2.5rem" }}
      className="absolute right-4 p-6 bg-white shadow-md rounded border border-neutral-200 max-w-md"
    >
      <h1 className="text-3xl font-bold">
        Beautiful, high-resolution desktop wallpapers for MacOS.
      </h1>
      <div className="text-neutral-500 mt-1">
        Endless curated images featuring categories such as nature, pattens,
        quotes, animals, and more.
      </div>
      <div className="mt-6">
        <a
          className="inline-block bg-red-500 rounded text-white py-2 px-6"
          href="https://apps.apple.com/us/app"
          target="_blank"
          rel="noreferrer"
        >
          Download Now
        </a>
      </div>
    </motion.div>
  );
}
