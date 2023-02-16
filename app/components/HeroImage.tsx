"use client";

import { loadImage } from "@/lib/cloudinary";
import { motion } from "framer-motion";
import Image from "next/image";

type FadeInProps = {
  imageId: string;
};

export default function HeroImage({ imageId }: FadeInProps) {
  return (
    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
      <Image
        loader={loadImage}
        src={imageId}
        width={600}
        height={400}
        quality={100}
        priority
        className="rounded"
        alt="Random wallpaper image."
      />
    </motion.div>
  );
}
