import { ImageLoaderProps } from "next/image";

export function loadImage({ src, width, quality }: ImageLoaderProps) {
  return `https://res.cloudinary.com/better-wallpapers/image/upload/q_${quality},w_${width}/${src}.jpg`;
}
