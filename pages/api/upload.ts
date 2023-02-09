import cloudinary from "@/lib/cloudinary";
import prisma from "@/lib/prisma";
import parseForm from "@/utils/parseForm";
import { Client } from "@upstash/qstash";
import formidable from "formidable";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "./auth/[...nextauth]";

type Error = {
  error: string;
};

type Data = {
  message: string;
};

const validateSchema = z.object({
  authorName: z.string().min(1, "Author name is required"),
  authorUrl: z.string().url("Author url is invalid"),
  tags: z.string().min(1, "At least one tag is required"),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Error>
) {
  const { method } = req;
  switch (method) {
    case "POST":
      const session = await getServerSession(req, res, authOptions);
      if (!session) {
        return res.status(401).json({ error: "unauthorized" });
      }

      const c = new Client({
        token: process.env["QSTASH_TOKEN"]!,
      });

      let form, schema;

      try {
        form = await parseForm(req);
      } catch (e) {
        console.error(e);
        return res.status(400).json({ error: "Unable to parse form" });
      }

      if (!!!form.files.image) {
        return res.status(400).json({ error: "No image is attached" });
      }

      try {
        schema = validateSchema.parse(form.fields);
      } catch (err: any) {
        console.error(err);
        return res.status(400).json({ error: err.errors[0].message });
      }

      const file = form.files.image as formidable.File;
      const { authorName, authorUrl, tags } = schema;

      const upload = await cloudinary.uploader.upload(file.filepath, {
        upload_preset: "default",
      });

      const image = await prisma.image.create({
        data: {
          blurHash: "",
          externalId: upload.public_id,
          externalVersion: `v${upload.version}`,
          authorName: authorName as string,
          authorUrl: authorUrl as string,
          visible: false,
        },
      });

      (tags as string).split(",").forEach(async (substr) => {
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

      await c.publishJSON({
        topic: "process-image",
        headers: {
          "Upstash-Callback": `https://${process.env.VERCEL_URL}/api/callback`,
        },
        body: {
          imageUrl: `https://res.cloudinary.com/better-wallpapers/image/upload/c_fill,h_300,w_450/${image.externalVersion}/${image.externalId}.jpg`,
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

export const config = {
  api: {
    bodyParser: false,
  },
};
