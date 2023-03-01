"use client";

import { loadImage } from "@/lib/cloudinary";
import Image from "next/image";

type WallpaperRollProps = {
  images: string[];
};

export default function WallpaperRoll({ images }: WallpaperRollProps) {
  return (
    <div className="flex gap-5 lg:gap-8 overflow-hidden justify-center mt-16">
      {images.map((src) => (
        <div
          key={src}
          className="relative w-60 aspect-[4/3] flex-none rounded-lg overflow-hidden"
        >
          <Image
            src={src}
            loader={loadImage}
            alt="Random wallpaper background image."
            fill
            quality={100}
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}
