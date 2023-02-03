import cloudinary from "@/lib/cloudinary";
import prisma from "@/lib/prisma";
import parseForm from "@/utils/parseForm";
import { encode } from "blurhash";
import formidable from "formidable";
import pixels from "image-pixels";
import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

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
  res: NextApiResponse<Data>
) {
  let form;

  try {
    form = await parseForm(req);
  } catch (e) {
    console.error(e);
    return res.status(400).json({ message: "An unexpected error occurred" });
  }

  if (!!!form.files.image) {
    return res.status(400).json({ message: "No image is attached" });
  }

  try {
    validateSchema.parse(form.fields);
  } catch (err: any) {
    console.error(err);
    return res.status(400).json({ message: err.errors[0].message });
  }

  const file = form.files.image as formidable.File;
  const { authorName, authorUrl, tags } = form.fields;

  const upload = await cloudinary.uploader.upload(file.filepath, {
    upload_preset: "default",
  });

  const { data, width, height } = await pixels(file.filepath);
  const blurHash = encode(data, width, height, 4, 3);

  const image = await prisma.image.create({
    data: {
      blurHash: blurHash,
      externalId: upload.public_id,
      externalVersion: `v${upload.version}`,
      authorName: authorName as string,
      authorUrl: authorUrl as string,
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

  return res.status(200).json({ message: "ok" });
}

export const config = {
  api: {
    bodyParser: false,
  },
};
