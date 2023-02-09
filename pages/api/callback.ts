import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

type Error = {
  error: string;
};

type Data = {
  message: string;
};

const validateSchema = z.object({
  blurHash: z.string().min(1, "Blurhash is required"),
  imageId: z.number({ required_error: "Image id is required" }),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Error>
) {
  const { method } = req;
  switch (method) {
    case "POST":
      let schema, body;

      try {
        body = JSON.parse(req.body.body);
      } catch {
        return res
          .status(400)
          .json({ error: "Unable to parse JSON request body" });
      }

      try {
        schema = validateSchema.parse(body);
      } catch (err: any) {
        return res.status(400).json({ error: err.errors[0].message });
      }
      const { blurHash, imageId } = schema;
      await prisma.image.update({
        where: {
          id: imageId,
        },
        data: {
          blurHash,
          visible: true,
        },
      });
      res.status(200).json({ message: "ok" });
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}