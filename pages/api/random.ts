import prisma from "@/lib/prisma";
import { Image } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

type Error = {
  error: string;
};

type Data = Image & {
  downloadUrl: string;
  previewUrl: string;
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
            image: {
              visible: true,
            },
            tag: {
              OR: tags.map((name) => ({ name })),
            },
          },
        });
        if (count > 0) {
          const skip = Math.floor(Math.random() * count);
          const tagsOnImages = await prisma.tagsOnImages.findFirst({
            skip,
            include: {
              image: true,
            },
            where: {
              image: {
                visible: true,
              },
              tag: {
                OR: tags.map((name) => ({ name })),
              },
            },
          });
          if (tagsOnImages) {
            const i = tagsOnImages.image;
            res.status(200).json({
              ...i,
              downloadUrl: `https://res.cloudinary.com/better-wallpapers/image/upload/${i.externalId}.jpg`,
              previewUrl: `https://res.cloudinary.com/better-wallpapers/image/upload/c_fill,h_300,q_100,w_450/${i.externalId}.jpg`,
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
