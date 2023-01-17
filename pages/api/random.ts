import prisma from "@/lib/prisma";
import { randomInt } from "crypto";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  blurHash: string;
  previewUrl: string;
  downloadUrl: string;
};

type Error = {
  error: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Error>
) {
  const { method } = req;
  switch (method) {
    case "GET":
      const tag = req.query.tag;
      if (tag) {
        const tags = tag instanceof Array ? tag : [tag];
        const count = await prisma.tagsOnImages.count({
          where: {
            tag: {
              OR: tags.map((name) => ({ name })),
            },
          },
        });
        if (count > 0) {
          const skip = randomInt(0, count);
          const tagsOnImages = await prisma.tagsOnImages.findFirst({
            skip,
            include: {
              image: true,
            },
            where: {
              tag: {
                OR: tags.map((name) => ({ name })),
              },
            },
          });
          if (tagsOnImages) {
            const image = tagsOnImages.image;
            res.status(200).json({
              blurHash: image.blurHash,
              previewUrl: `https://res.cloudinary.com/better-wallpapers/image/upload/t_preview/${image.externalId}.jpg`,
              downloadUrl: `https://res.cloudinary.com/better-wallpapers/image/upload/${image.externalId}.jpg`,
            });
          }
        } else {
          res.status(400).json({ error: "no images were found" });
        }
      } else {
        res.status(400).json({ error: "at least one 'tag' must be specified" });
      }
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
