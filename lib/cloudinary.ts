import { ImageLoaderProps } from "next/image";

export function loadImage({ src, width, quality }: ImageLoaderProps) {
  return `https://res.cloudinary.com/better-wallpapers/image/upload/c_fill,f_auto,q_${quality},w_${width}/${src}`;
}
