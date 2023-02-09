import prisma from "@/lib/prisma";
import { verifySignature } from "@upstash/qstash/nextjs";
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

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Error>
) {
  const { method } = req;
  switch (method) {
    case "POST":
      let schema, body;

      try {
        body = JSON.parse(
          Buffer.from(req.body.body, "base64").toString("ascii")
        );
      } catch {
        console.error("Unable to parse request body");
        return res.status(400).json({ error: "Unable to parse request body" });
      }

      try {
        schema = validateSchema.parse(body);
      } catch (err: any) {
        console.error(err.errors[0].message);
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
      break;
    default:
      console.error(`Method ${method} Not Allowed`);
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}

export default verifySignature(handler);

export const config = {
  api: {
    bodyParser: false,
  },
};
