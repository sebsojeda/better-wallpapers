import prisma from "@/lib/prisma";
import { Client } from "@upstash/qstash";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "./auth/[...nextauth]";

type Data = {
  message: string;
};

const validateSchema = z.object({
  authorName: z.string().min(1, "Author name is required"),
  authorUrl: z.string().url("Author url is invalid"),
  tags: z.string().min(1, "At least one tag is required"),
  externalId: z.string().min(1, "External ID is invalid"),
  externalVersion: z.number({ required_error: "External version is required" }),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { method } = req;
  switch (method) {
    case "POST":
      const session = await getServerSession(req, res, authOptions);
      if (!session) {
        console.error("unauthorized");
        return res.status(401).json({ message: "unauthorized" });
      }

      const qstash = new Client({
        token: process.env["QSTASH_TOKEN"]!,
      });

      const schema = validateSchema.safeParse(req.body);
      if (!schema.success) {
        console.error(schema.error);
        return res
          .status(400)
          .json({ message: schema.error.errors[0].message });
      }

      const image = await prisma.image.create({
        data: {
          blurHash: "",
          externalId: schema.data.externalId,
          externalVersion: `v${schema.data.externalVersion}`,
          authorName: schema.data.authorName,
          authorUrl: schema.data.authorUrl,
          visible: false,
        },
      });

      schema.data.tags.split(",").forEach(async (substr) => {
        const name = substr.trim();
        const tag = await prisma.tag.upsert({
          where: {
            name,
          },
          update: {},
          create: {
            name,
          },
        });

        await prisma.tagsOnImages.create({
          data: {
            tagId: tag.id,
            imageId: image.id,
          },
        });
      });

      await qstash.publishJSON({
        topic: "process-image",
        headers: {
          "Upstash-Callback": `https://${process.env.VERCEL_URL}/api/callback`,
          Accept: "application/json",
        },
        body: {
          imageUrl: `https://res.cloudinary.com/better-wallpapers/image/upload/c_fill,h_300,q_100,w_450/${image.externalVersion}/${image.externalId}.jpg`,
          imageId: image.id,
        },
      });

      res.status(200).json({ message: "ok" });
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
